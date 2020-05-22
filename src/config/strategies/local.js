const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:localStrategy');

const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';

const localStrategy = () => {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    (username, password, done) => {
      const logIn = async () => {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to the server');

          const db = client.db(dbName);
          const collection = db.collection('users');
          const user = await collection.findOne({ username });

          if (user && user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
          debug(user);
        } catch (error) {
          debug(error);
          done(error, false);
        }
        client.close();
      };
      logIn();
    },
  ));
};

module.exports = localStrategy;
