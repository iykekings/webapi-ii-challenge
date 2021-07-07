const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');

const server = express();
const PORT = process.env.PORT || 4000;

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json('Post server running at /posts');
});

server.use('/posts', postsRouter);

server.listen(PORT, () => {
  console.log('Server running at http://localhost:4000');
});
