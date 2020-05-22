const express = require('express');

const homeRouter = express.Router();
const router = (header) => {
  homeRouter.route('/')
    .get((req, res) => {
      res.render('index', {
        ...header,
      });
    });

  return homeRouter;
};


module.exports = router;
