const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const passport = require('passport')
const LocalStrategy = require('passport-local')

const db = require('../models')
const User = db.User

passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
  return User.findOne({
    attributes: ['id', 'name', 'email', 'password'],
    where: { email: username},
    raw: true
  })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'email或密碼錯誤'})
      }
      return bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch){
            return done(null, false, { message: 'email或密碼錯誤'})
          }
          return done(null, user)
        })
    })
    .catch(error => {
      error.errorMessage = '登入失敗'
      done(error)
    })
}))

passport.serializeUser((user, done) => {
  const { id, name, email } = user
  return done(null, { id, name, email})
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword} = req.body

  if (!email || !password) {
    req.flash('error', 'email 和 password 為必填')
    res.redirect('back')
  }
  if (password !== confirmPassword) {
    req.flash('error', '驗證密碼與密碼不符')
    res.redirect('back')
  }

  return User.count({ where: { email }})
    .then(amount => {
      if (amount > 0) {
        req.flash('error', 'email 已註冊')
        return
      }
      return bcrypt.hash(password, 10)
        .then(hash => User.create({ name, email, password: hash }))
    })
    .then(user => {
      if (!user) {
        return res.redirect('back')
      }

      req.flash('success', '註冊成功')
      return res.redirect('/login')
    })
    .catch(error => {
      error.errorMessage = '發生錯誤，註冊失敗'
      next(error)
    })
})

router.post('/logout', (req, res) => {
  res.send('post logout info')
})

module.exports = router