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
    socket.on('drawing-room-join', (id) => {
        socket.join(id);
        console.log('a user joined room ' + id);
    })
    socket.on('drawing-board-update', (id, data)=> {
        socket.to(id).emit('drawing-board-update', data);
        console.log('a user updated room ' + id);
        
    })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});