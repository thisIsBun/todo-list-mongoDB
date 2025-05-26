import express from 'express';
import User from '../../models/user.js';
import passport from 'passport';
import bcryptjs from 'bcryptjs';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}));

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填。' })
  }

  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不一樣。'})
  }

  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({ email })
  .then(user => {
    if (user) {
      errors.push({ message: 'Email 已經註冊過了。'})
      return res.render('register', { errors, name, email, password, confirmPassword });
    }      
    return bcryptjs.genSalt(10)
  })
  .then(salt => bcryptjs.hash(password, salt))
  .then(hash => User.create({ name, email, password: hash }))
  .then(() => res.redirect('/'))
  .catch((error) => console.log(error));
});

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '登出成功。')
  res.redirect('/users/login')
})

export default router;
