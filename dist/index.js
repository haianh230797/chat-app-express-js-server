const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const port = 3000;

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
  {
    _id: 1441543,
    image: 'https://firebasestorage.googleapis.com/v0/b/chat-app-67c61.appspot.com/o/photos%2F89572368.4628666%2F1601719932327.jpg?alt=media&token=661b6eb9-2633-477c-b6c5-72b95f48376c',
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
  socket.on('chat image', (msg) => {
    arr.push(msg);
    io.to('chat').emit('chat image', msg);
  });
  socket.on('typing', (msg) => {
    io.to('chat').emit('typing', msg);
  });
});

app.get('/', (req, res) => {
  res.send('helloooo');
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
