const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const port = 3000;

let arrChan = [];
let arrLe = [];
let connectionCount = 0;
io.on("connection", (socket) => {
  connectionCount++;
  console.log("connection count: ", connectionCount);
  if (connectionCount % 2 === 0) {
    socket.room = 'chan';
    socket.join("chan");
  } else {
    socket.join("le");
    socket.room = 'le';
  }
  console.log("a user connected :D", socket.id);
  socket.on("chat message", (msg) => {
    console.log(socket.room)
    if (socket.room === 'chan') {
      arrChan.unshift(...msg);
      io.to('chan').emit("chat message", arrChan);
    } else {
      arrLe.unshift(...msg);
      io.to('le').emit("chat message", arrLe);
    }
    console.log("on listen message : " + msg);
  });
});

app.get("/", (req, res) => {
  res.send("hello");
});

server.listen(port, () => {
  console.log("server is running");
});
