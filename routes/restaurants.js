const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

const sequelize = require('sequelize');
const { Op } = require("sequelize");

router.get('/', (req, res) => {
  const keyword = req.query.keyword?.trim().toLowerCase() || ''
  const sortSetting = req.query.sort || 'id'

  return Restaurant.findAll({
    where: {  // WHERE (LOWER(`name`) LIKE '%[keyword]%' OR LOWER(`category`) LIKE '%[keyword]%')
      [Op.or]: [
        sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), {
          [Op.like]: `%${keyword}%`
        }),
        sequelize.where(sequelize.fn('LOWER', sequelize.col('category')), {
          [Op.like]: `%${keyword}%`
        })
      ]
    },
    order: [sortSetting.split('-')],
    attributes: ['id', 'name', 'image', 'category', 'rating'],
    raw: true
  })
    .then(restaurants => res.render('index', { restaurants, keyword, [sortSetting]:sortSetting }))
    .catch((err) => res.status(422).json(err))
  
})

router.get('/new', (req, res) => {
  return res.render('create')
})

router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('./restaurants'))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['name', 'category', 'location', 'google_map', 'phone', 'description', 'image'],
    raw: true
  })
    .then(rest => res.render('detail', { rest }))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    raw: true
  })
    .then(rest => res.render('edit', { rest }))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  return Restaurant.update(body , { where: { id }})
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.destroy({ where: { id }})
    .then(() => res.redirect('/restaurants'))
})

module.exports = router