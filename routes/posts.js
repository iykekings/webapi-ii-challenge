const express = require('express');
// const PostsDB = require('../data/db');

const postsRouter = express.Router();

postsRouter.get('/', (req, res) => {
  res.status(200).json('cool');
});

module.exports = postsRouter;
