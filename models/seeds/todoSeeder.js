const mongoose = require('mongoose')
const Todo = require('../todo')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 1; i < 11; i++) {
    Todo.create({ name: `todo-${i}`})
  }
  console.log('done!')
}) 