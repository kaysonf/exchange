import {Socket} from "socket.io";
import {Market, Order, OrderBookM} from "../../domain/models/Trading";

const randomNumberBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomOrderBookData = (): OrderBookM => {

    const generateRandomOrder = (orderSize: number): Order[] => [...Array(orderSize)].map(o => ({
        price: randomNumberBetween(5000, 6000), volume: randomNumberBetween(10, 100)
    }));

    return {
        asks: generateRandomOrder(10),
        bids: generateRandomOrder(10),
        timestamp: new Date().getTime()
    }
}

const generateRandomMarketData = (): Market => {
    return {
        lastTradedPrice: [randomNumberBetween(5000, 6000), randomNumberBetween(5000, 600)],
        volume: randomNumberBetween(10, 100)
    }
}

export default {
    orderBook: (socket: Socket) => setInterval(() => socket.emit('order_book', generateRandomOrderBookData()), 500),
    market: (socket: Socket) => setInterval(() => socket.emit('market', generateRandomMarketData()), 750),
}