const express = require('express');
const bookController = require('../controllers/booksController');

const bookRouter = express.Router();

const router = (header) => {
  const { getIndex, getById, checkAuth } = bookController(header);

  bookRouter.use(checkAuth);
  bookRouter.route('/').get(getIndex);
  bookRouter.route('/:id').get(getById);

  return bookRouter;
};

module.exports = router;
