import express, { response } from 'express';
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
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    const promptPrefix = 'simple 2-color logo-style one-line drawing of ';
    const fullPrompt = promptPrefix + prompt;

    const recaptchaVerifyUrl =
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`;

    try {
        console.log('requesting captcha');
        const captchaRes = await fetch(recaptchaVerifyUrl, { method: "POST" });
        const google_response = await captchaRes.json();

        if (google_response.success !== true || google_response.score < 0.6) {
            console.error('captcha failed', google_response);
            return res.status(500).json({ error: 'captcha_failed' });
        }

        console.log('captcha succeeded');
    } catch (error) {
        console.error('captcha request failed', error);
        return res.status(500).json({ error: 'captcha_request_failed' });
    }

    try {
        console.log('generating image');
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: fullPrompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        });

        console.log('image generation succeeded');
        return res.status(200).json(response);
    } catch (error) {
        console.error('image generation failed', error);
        return res.status(500).json({ error: 'image_generation_failed' });
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