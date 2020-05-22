const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'library',
  resave: true,
  saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, '/public')));
require('./src/config/passport')(app);

app.use('/css', express.static(path.join(__dirname, '/node_modules/materialize-css/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/materialize-css/dist/js')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const header = {
  title: 'My Library',
  nav: [
    {
      title: 'Books',
      href: '/books',
    },
    {
      title: 'Authors',
      href: '/authors',
    },
  ],
};

const bookRouter = require('./src/routes/bookRoutes')(header);
const homeRouter = require('./src/routes/homeRoutes')(header);
const adminRouter = require('./src/routes/adminRoutes')(header);
const authRouter = require('./src/routes/authRoutes')(header);

app.use('/', homeRouter);
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.listen(3000, () => {
  debug(`Listening on port: ${chalk.green(port)}`);
});
