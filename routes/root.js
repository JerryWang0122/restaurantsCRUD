const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')

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

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['email', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value
  const name = profile.displayName
  return User.findOne({
    attributes: ['id', 'name', 'email'],
    where: { email },
    raw: true
  })
    .then((user) => {
      if (user) return done(null, user)

      const randomPwd = Math.random().toString(36).slice(-8)
      return bcrypt.hash(randomPwd, 10)
        .then(hash => User.create({ name, email, password: hash }))
        .then(user => done(null, user))
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

passport.deserializeUser((user, done) => {
  done(null, { id: user.id, name: user.name })
})

router.get('/oauth2/login/facebook', passport.authenticate('facebook', { scope: ['email'] }))

router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureFlash: true
}))

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
  req.logout(error => {
    if (error) {
      next(error)
    }
    return res.redirect('/login')
  })
})

module.exports = router