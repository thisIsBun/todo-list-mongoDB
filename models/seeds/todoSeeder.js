const db = require('../../config/mongoose')
const Todo = require('../todo')

db.once('open', () => {
  for (let i = 1; i < 11; i++) {
    Todo.create({ name: `todo-${i}`})
  }
  console.log('done!')
}) 