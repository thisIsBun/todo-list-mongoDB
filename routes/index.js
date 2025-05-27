import express from 'express';
import home from './modules/home.js'
import todos from './modules/todos.js'
import users from './modules/users.js'
import auth from './modules/auth.js'
import { authenticator } from '../middleware/auth.js';

const router = express.Router();
router.use('/todos', authenticator, todos);
router.use('/users', users);
router.use('/auth', auth);
router.use('/', authenticator, home);

export default router;
