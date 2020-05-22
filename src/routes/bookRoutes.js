const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';

const getBooksCollection = async (client) => {
  let collection;
  try {
    debug('Connected correctly to the server');
    const db = client.db(dbName);
    collection = await db.collection('books');
  } catch (error) {
    collection = error.stack;
  }
  return collection;
};

const getBooks = async (client) => {
  let books;
  try {
    const collection = await getBooksCollection(client);
    books = await collection.find().toArray();
  } catch (error) {
    books = error.stack;
    debug(books);
  } finally {
    client.close();
  }
  return books;
};

const getBook = async (client, bookId) => {
  let book;
  try {
    const collection = await getBooksCollection(client);
    const id = new ObjectId(bookId);
    book = await collection.findOne({ _id: id });
  } catch (error) {
    book = error.stack;
    debug(book);
  } finally {
    client.close();
  }
  return book;
};

const bookRouter = express.Router();

const router = (header) => {
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });

  bookRouter.route('/')
    .get(async (req, res) => {
      const client = await MongoClient.connect(url);
      const books = await getBooks(client);
      res.render('books', {
        ...header,
        books,
      });
    });

  bookRouter.route('/:id')
    .get(async (req, res) => {
      const { id } = req.params;
      const client = await MongoClient.connect(url);
      const book = await getBook(client, id);
      res.render('singleBook', {
        ...header,
        book,
      });
    });

  return bookRouter;
};

module.exports = router;
