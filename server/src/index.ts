import express from 'express';
import cors from 'cors';
import fakeDb from './fake_db';
import fakeRTApi from './fake_realtime_api';
import {PositionM} from "../../domain/models/Trading";

// express
const app = express();
app.use(cors());

// socket io
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io'
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

const port = 5000;

app.get('/api/positions', (req, res) => {

    const positions: PositionM[] = fakeDb.getPositions();

    res.status(200).send(positions);
});

io.on('connect', (socket) => {
    fakeRTApi.orderBook(socket);
    fakeRTApi.market(socket);
})


server.listen(port, () => console.log(`Running on port ${port}`));