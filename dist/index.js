const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const port = 3000;

let arr = [];

io.on('connection', (socket) => {
  socket.room = 'chat';
  socket.join('chat');
  console.log('a user connected :D', socket.id);

  var hs = socket.handshake;
  users[hs.session.username] = socket.id;
  clients[socket.id] = socket;
  
  socket.on('disconnect', function () {
    delete clients[socket.id]; // remove the client from the array
    delete users[hs.session.username]; // remove connected user & socket.id
  });
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

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
