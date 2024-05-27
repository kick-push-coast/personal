import 'dotenv/config';
import express from 'express';
import OpenAI from "openai";
import cors from 'cors';
import fetch from 'node-fetch';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json({ type: '*/*' }));
app.use(cors());
const server = createServer(app);

const openai = new OpenAI();
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

let roomInitialStates = {};

app.post('/generate-drawing', async (req, res) => {
    const { prompt, recaptchaToken } = req.body;
    const recaptchSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    const promptPrefix = 'simple 2-color logo-style one-line drawing of ';
    const fullPrompt = promptPrefix + prompt;

    const recaptchaVerifyUrl =
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchSecretKey}&response=${recaptchaToken}`;

    // RECAPTCHA VERIFY REQUEST
    fetch(recaptchaVerifyUrl, {
        method: "post",
    })
    .then((response) => response.json())
    .then((google_response) => {
        if (google_response.success !== true || google_response.score < 0.6) {
            return res.send({ response: 'error' });
        }
    })
    .catch(() => {
        return res.send({ response: 'error' });
    });

    // OPENAI GEN REQUEST
    try {
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: fullPrompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        });
    
        return res.send(response);
    } catch {
    }
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
    socket.on('drawing-board-update', (id, data) => {
        if (roomInitialStates[id]) {
            roomInitialStates[id].image = data;
        }
        socket.to(id).emit('drawing-board-update', data);
        console.log('a user updated room ' + id);

    })
    socket.on('disconnecting', (id) => {
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