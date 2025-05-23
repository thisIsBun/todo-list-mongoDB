import express from 'express';
import { engine } from 'express-handlebars';
import methodOverride from './config/methodOverride.cjs';
import router from './routes/index.js'
import './config/mongoose.js'
import session from 'express-session'
import usePassport from './config/passport.js';
import flash from 'connect-flash'

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

usePassport(app);
app.use(flash())

// setup res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(router);

app.listen(PORT, () => {
  console.log(`Express server is listening on http://localhost:${PORT}/`);
});
