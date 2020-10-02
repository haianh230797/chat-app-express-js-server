const express = require('express');
const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const multer = require('multer');
const path = require('path');

const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }); // for parsing multipart/form-data

let arr = [
  {
    _id: 1441542,
    text: 'Hello 1',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 1441543,
    text: 'Hello 2',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
];

app.use(bodyParser.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  socket.room = 'chat';
  socket.join('chat');
  console.log('a user connected :D', socket.id);
  //---------get initial data
    io.to('chat').emit('getData', arr);
  //-----------------------------
  socket.on('chat message', (msg) => {
    arr.push(msg);
    io.to('chat').emit('chat message', msg);
  });
});

app.get('/', (req, res) => {
  res.send('helloooo');
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
