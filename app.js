const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

// index page
app.get('/', (req, res) => {
  Todo.find()
  .lean()
  .then(todos => res.render('index', { todos }))
  .catch(error => console.error(error))
})

// create new todo
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// post new todo
app.post('/todos', (req, res) => {
  const newTodo = req.body.name

  Todo.create({ name: newTodo })
  .then(() => res.redirect('/'))
  .catch(error => console.error(error))
})

// review todo detail
app.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id)
  .lean()
  .then((todo) => res.render('detail', { todo }))
  .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('Express server is listening on http://localhost:3000/')
})