const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

const sequelize = require('sequelize');
const { Op } = require("sequelize");

router.get('/', (req, res) => {
  const keyword = req.query.keyword?.trim().toLowerCase() || ''
  const sort = req.query.sort || 'id'
  const page = parseInt(req.query.page) || 1
  const limit = 6

  return Restaurant.findAndCountAll({
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
    limit,
    offset: (page - 1) * limit,
    order: [sort.split('-')],
    attributes: ['id', 'name', 'image', 'category', 'rating'],
    raw: true
  })
    .then(restaurants => {
      const maxPage = Math.ceil(restaurants.count / limit)
      res.render('index', { 
        restaurants: restaurants.rows,
        prev: page > 1 ? page - 1 : 1,
        next: page >= maxPage ? maxPage : page + 1,
        keyword, sort, page, maxPage
      })
    })
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