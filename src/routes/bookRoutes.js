const express = require('express');
const books = require('../data/books');

const router = (header) => {
  const bookRouter = express.Router();

  bookRouter.route('/')
    .get((req, res) => {
      res.render('books', {
        ...header,
        books,
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render('singleBook', {
        ...header,
        book: books[id],
      });
    });

  return bookRouter;
};

module.exports = router;
