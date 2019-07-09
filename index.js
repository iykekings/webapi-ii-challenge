const express = require('express');
const cors = require('cors');
const server = express();

server.use(express.json());
server.use(cors());

server.listen(4000, () => {
  console.log('Srever running at http://localhost:4000');
});
