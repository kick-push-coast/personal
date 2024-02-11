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

let roomInitialStates = {};

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('drawing-room-create', (id, roomState) => {
        socket.join(id);
        roomInitialStates[id] = roomState;
        console.log('a user created room ' + id);
    })
    socket.on('drawing-room-join', (id, callbackFn) => {
        if (io.sockets.adapter.rooms.get(id)) {
            socket.join(id);
            callbackFn(roomInitialStates[id]);
            console.log('a user joined room ' + id);
        } else {
            callbackFn(null);
        }
    })
    socket.on('drawing-board-update', (id, data)=> {
        if (roomInitialStates[id]) {
            roomInitialStates[id].image = data;
        }
        socket.to(id).emit('drawing-board-update', data);
        console.log('a user updated room ' + id);
        
    })
    socket.on('disconnecting', (id)=> {
        // Clean up initial state object on disconnect
        for (const roomId of socket.rooms) {
            if (io.sockets.adapter.rooms.get(roomId).size <= 1) {
                delete roomInitialStates[roomId];
            }
        }
    })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});