const express = require('express');
const PostsDB = require('../data/db');

const postsRouter = express.Router();

postsRouter.get('/', async (req, res) => {
  try {
    const posts = await PostsDB.find();
    if (posts.length) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ error: 'posts not found' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "Couldn't fetch posts" });
  }
});

module.exports = postsRouter;
