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
    .catch((error) => {
      error.errorMessage = '資料取得失敗:('
      next(error)
    })
})

router.get('/new', (req, res) => {
  return res.render('create')
})

router.post('/', (req, res, next) => {
  return Restaurant.create(req.body)
    .then(() => {
      req.flash('success', '新增成功')
      return res.redirect('/restaurants')
    })
    .catch(error => {
      error.errorMessage = '新增失敗'
      next(error)
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['name', 'category', 'location', 'google_map', 'phone', 'description', 'image'],
    raw: true
  })
    .then(rest => res.render('detail', { rest }))
    .catch(error => {
      error.errorMessage = '資料取得失敗:('
      next(error)
    })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    raw: true
  })
    .then(rest => res.render('edit', { rest }))
    .catch(error => {
      error.errorMessage = '資料取得失敗:('
      next(error)
    })
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  return Restaurant.update(body , { where: { id }})
      .then(() => {
        req.flash('success', '更新成功')
        return res.redirect(`/restaurants/${id}`)
      })
      .catch(error => {
        error.errorMessage = '更新失敗'
        next(error)
      })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  return Restaurant.destroy({ where: { id }})
    .then(() => {
      req.flash('success', '刪除成功')
      return res.redirect('/restaurants')
    })
    .catch(error => {
      error.errorMessage = '刪除失敗'
      next(error)
    })
})

module.exports = router