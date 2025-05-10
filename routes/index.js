import express from 'express';
import home from './modules/home.js'
import todos from './modules/todos.js'

const router = express.Router();
router.use('/', home);
router.use('/todos', todos);

export default router;
