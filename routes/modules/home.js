import express from 'express';
import Todo from '../../models/todo.js'

const router = express.Router();

router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((todos) => res.render('index', { todos }))
    .catch((error) => console.error(error));
});

export default router;
