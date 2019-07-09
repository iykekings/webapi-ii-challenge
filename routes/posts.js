const express = require('express');
const PostsDB = require('../data/db');

const postsRouter = express.Router();

postsRouter.get('/', async (req, res) => {
  try {
    const posts = await PostsDB.find();
    if (posts.length) {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ error: 'The posts information could not be retrieved.' });
  }
});

postsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostsDB.findById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'The post could not be retrieved.' });
  }
});

postsRouter.get('/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await PostsDB.findPostComments(id);
    const post = await PostsDB.findById(id);
    if (Object.keys(post).length) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'The comments information could not be retrieved.' });
  }
});

module.exports = postsRouter;
