import express from 'express';
import cors from 'cors';
import fakeDb from './fake_db';
import fakeRTApi from './fake_realtime_api';
import {Market, OrderTicket, PositionM} from "../../domain/models/Trading";

// express
const app = express();
app.use(cors());
app.use(express.json());

// socket io
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io'
import {generateRandomOHLC, maxPriceETH_USDC, minPriceETH_USDC, randomNumberBetween} from "./faker_functions";
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

io.on('connect', () => fakeDb.resetDB());

fakeRTApi.initOrderBookData(io);
fakeRTApi.initMarketData(io);

// views
app.get('/api/positions', async (req, res) => {

    const positions: PositionM[] = await fakeDb.getPositions();

    res.status(200).send(positions);
});

app.get('/api/market', (req, res) => {
    const currDate = new Date();

    const mockMarketData: Market[] = [...Array(25)].map((_, i) => {

        const refDate = currDate;

        return {
            timestamp: new Date(refDate.getSeconds() - (50 - i) * 1000),
            lastTradedPrice: randomNumberBetween(minPriceETH_USDC, maxPriceETH_USDC),
            volume: randomNumberBetween(10, 100),
            ohlc: generateRandomOHLC(),
        }

    });

    res.status(200).send(mockMarketData);
})

app.post('/api/create', async (req, res) => {
    const body = req.body as OrderTicket;

    try {
        await fakeDb.createOrder(body);
        res.status(200).send(body);
    } catch (error) {
        res.status(500).send({error});
    }

});


const port = 5000;
server.listen(port, () => console.log(`Running on port ${port}`));
