const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false,
  },
  {
    title: 'Les Misérables',
    genre: 'Historical fiction',
    author: 'Victor Hugo',
    read: false,
  },
  {
    title: 'Don Qvixote',
    genre: 'Adventure fiction',
    author: 'Miguel de Cervantes',
    read: false,
  },
  {
    title: 'Cien Años de Soledad',
    genre: 'Magic realism',
    author: 'Gabriel García Márquez',
    read: false,
  },
  {
    title: 'Anna Karenina',
    genre: 'Historical fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false,
  },
];

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

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/materialize-css/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/materialize-css/dist/js')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

bookRouter.route('/')
  .get((req, res) => {
    res.render('books', {
      ...header,
      books,
    });
  });

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render('index', {
    ...header,
  });
});

app.listen(3000, () => {
  debug(`Listening on port: ${chalk.green(port)}`);
});
