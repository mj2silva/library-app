const passport = require('passport');
require('./strategies/local')();

const passportConfig = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in a session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieves user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = passportConfig;
