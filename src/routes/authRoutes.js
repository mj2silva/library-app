const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';

const authRouter = express.Router();

const router = (header) => {
  authRouter.route('/sign-up')
    .post((req, res) => {
      // TODO: Create user
      const { username, password } = req.body;
      const user = {
        username,
        password,
      };
      const addUser = async () => {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to the server');
          const db = client.db(dbName);
          const collection = db.collection('users');
          const results = await collection.insertOne(user);
          debug(results);
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug(error);
        }
        client.close();
      };
      addUser();
    });

  authRouter.route('/sign-in')
    .get((req, res) => {
      res.render('signIn', {
        ...header,
        title: 'Sign in',
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }));

  authRouter.route('/sign-out')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
};

module.exports = router;
