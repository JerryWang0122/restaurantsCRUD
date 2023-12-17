const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const passport = require('passport')

const db = require('../models')
const User = db.User

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