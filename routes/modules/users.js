import express from 'express';
import User from '../../models/user.js';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        console.log('user existed already');
        res.render('register', { name, email, password, confirmPassword });
      } else {
        User.create({ name, email, password })
          .then(() => {
            res.redirect('/');
          })
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
});

export default router;
