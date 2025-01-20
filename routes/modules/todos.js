const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// create new todo
router.get('/new', (req, res) => {
  return res.render('new')
})

// post new todo
router.post('', (req, res) => {
  const newTodo = req.body.name

  Todo.create({ name: newTodo })
  .then(() => res.redirect('/'))
  .catch(error => console.error(error))
})

// review todo detail
router.get('/:id', (req, res) => {
  Todo.findById(req.params.id)
  .lean()
  .then((todo) => res.render('detail', { todo }))
  .catch(error => console.error(error))
})

// view edit todo page
router.get('/:id/edit', (req, res) => {
  Todo.findById(req.params.id)
  .lean()
  .then(todo => res.render('edit', { todo }))
  .catch(error => console.error(error))
})

// post edit todo
router.put('/:id', (req, res) => {
  const id = req.params.id
  
  Todo.findById(id)
  .then(todo => {
    const { name, isDone } = req.body
    todo.name = name
    todo.isDone = isDone === 'on'
    return todo.save()
  })
  .then(() => res.redirect(`/todos/${id}`))
  .catch(error => console.error(error))
})

// delete todo
router.delete('/:id', (req, res) => {
  Todo.findById(req.params.id)
  .then(todo => {
    return todo.remove()
  })
  .then(() => res.redirect('/'))
  .catch(error => console.error(error))
})

module.exports = router