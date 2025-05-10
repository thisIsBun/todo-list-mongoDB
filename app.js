import express from 'express';
import { engine } from 'express-handlebars';
import methodOverride from './config/methodOverride.cjs';
import router from './routes/index.js'
import './config/mongoose.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(router);

app.listen(PORT, () => {
  console.log(`Express server is listening on http://localhost:${PORT}/`);
});
