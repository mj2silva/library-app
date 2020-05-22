const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
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

app.use('/', homeRouter);
app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.listen(3000, () => {
  debug(`Listening on port: ${chalk.green(port)}`);
});
