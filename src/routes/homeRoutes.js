const express = require('express');

const router = (header) => {
  const homeRouter = express.Router();

  homeRouter.route('/')
    .get((req, res) => {
      res.render('index', {
        ...header,
      });
    });

  return homeRouter;
};


module.exports = router;
