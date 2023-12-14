const express = require('express')
const router = express.Router()

const root = require('./root')
const restaurants = require('./restaurants')

router.use('/', root)
router.use('/restaurants', restaurants)

router.get('/', (req, res) => {
  res.redirect('/login')
})

module.exports = router