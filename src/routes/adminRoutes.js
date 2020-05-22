const express = require('express');

const router = (header) => {
  const adminRouter = express.Router();

  adminRouter.route('/')
    .get((req, res) => {
      res.send('inserting books');
    });

  return adminRouter;
};

module.exports = router;
