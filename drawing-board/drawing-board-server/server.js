const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    path: '/drawing-socket',
    cors: {
        origin: '*',
    }
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('drawing-board-update', (data)=> {
        socket.broadcast.emit('drawing-board-update', data);
        
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});