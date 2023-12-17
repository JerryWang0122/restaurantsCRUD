const express = require('express')
const { engine } = require('express-handlebars')
const handlebars = require('handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()
const port = 3000

const router = require('./routes')
const messageHandlers = require('./middlewares/message-handlers')
const errorHandlers = require('./middlewares/error-handlers')

handlebars.registerHelper('isEqual', (arg1, arg2) => {
  return arg1 === arg2
})

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const passport = require('passport')

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use(messageHandlers)

app.use(router)

app.use(errorHandlers)

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})