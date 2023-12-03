const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 3000

const db = require('./models')
const Restaurant = db.Restaurant

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  const keyword = req.query.keyword?.trim().toLowerCase()

  return Restaurant.findAll({
    attributes: ['id', 'name', 'image', 'category', 'rating'],
    raw: true
  })
    .then(restaurants => {
      const matchedRestaurants = keyword ? restaurants.filter((rest) => {
        return rest.name.toLowerCase().includes(keyword) || rest.category.includes(keyword)
      }) : restaurants

      res.render('index', { restaurants: matchedRestaurants, keyword })
    })
    .catch((err) => res.status(422).json(err))
  
})

app.get('/restaurants/new', (req, res) => {
  return res.render('create')
})

app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('./restaurants'))
    .catch(err => console.log(err))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    attributes: ['name', 'category', 'location', 'google_map', 'phone', 'description', 'image'],
    raw: true
  })
    .then(rest => res.render('detail', { rest }))
    .catch(err => console.log(err))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id, {
    raw: true
  })
    .then(rest => res.render('edit', { rest }))
    .catch(err => console.log(err))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  return Restaurant.update(body , { where: { id }})
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(err => console.log(err))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.destroy({ where: { id }})
    .then(() => res.redirect('/restaurants'))
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})