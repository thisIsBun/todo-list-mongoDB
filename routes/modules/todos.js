import express from 'express';
import Todo from '../../models/todo.js';

const router = express.Router();

// create new todo
router.get('/new', (req, res) => {
  return res.render('new');
});

// post new todo
router.post('/', (req, res) => {
  const userId = req.user._id;
  const newTodo = req.body.name.split(',').map((item) => {
    return { name: item.trim(), userId };
  });

  Todo.insertMany(newTodo)
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error));
});

// review todo detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.error(error));
});

// view edit todo page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.error(error));
});

// post edit todo
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id;
  
  Todo.findOne({ _id, userId })
  .then((todo) => {
      const { name, isDone } = req.body;
      todo.name = name;
      todo.isDone = isDone === 'on';
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch((error) => console.error(error));
});

// delete todo
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Todo.deleteOne({ _id, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error));
});

export default router;
