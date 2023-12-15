const express = require('express')
const router = express.Router()

const root = require('./root')
const restaurants = require('./restaurants')
const authHandler = require('../middlewares/auth-handler')

router.use('/', root)
router.use('/restaurants', authHandler, restaurants)

router.get('/', (req, res) => {
  res.redirect('/login')
})

module.exports = router