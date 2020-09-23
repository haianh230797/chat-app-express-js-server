const express = require('express')
const app = express()
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const port  = 3000

let arr = []
io.on('connection',socket =>{
    console.log("a user connected :D", socket.id);
    socket.on('chat message', msg =>{
        arr.unshift(...msg)
          console.log('on listen message : ' + msg);
        io.emit('chat message',arr)
    })
})


app.get('/', (req, res) =>{
    res.send('hello')
})

server.listen(port, () => {
    console.log('server is running')
})



