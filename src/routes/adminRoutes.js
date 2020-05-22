const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const books = require('../data/books');

const router = (/* header */) => {
  const adminRouter = express.Router();

  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      const mongo = async () => {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to the server');
          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      };
      mongo();
      res.send('inserting books');
    });

  return adminRouter;
};

module.exports = router;
