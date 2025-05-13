import express from 'express';
import home from './modules/home.js'
import todos from './modules/todos.js'
import users from './modules/users.js'

const router = express.Router();
router.use('/', home);
router.use('/todos', todos);
router.use('/users', users);

export default router;
