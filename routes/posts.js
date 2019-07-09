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
    if (post.length) {
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

postsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const toBeDeleted = await PostsDB.findById(id);
  if (Object.keys(toBeDeleted).length) {
    try {
      await PostsDB.remove(id);
      res.status(200).json(toBeDeleted);
    } catch (error) {
      res.status(500).json({ error: 'The post could not be removed' });
    }
  } else {
    res.status(404).json({ message: 'The post with the specified ID does not exist.' });
  }
});

postsRouter.post('/', async (req, res) => {
  const { title, contents } = req.body;
  if (title && contents) {
    try {
      const newPost = await PostsDB.insert({ title, contents });
      const addedPost = await PostsDB.findById(newPost.id);
      res.status(201).json(addedPost[0]);
    } catch (error) {
      res.status(500).json({ error: 'There was an error while saving the post to the database' });
    }
  } else {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
});
module.exports = postsRouter;
