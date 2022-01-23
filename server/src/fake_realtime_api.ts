import {Server} from "socket.io";
import {Market, Order, OrderBookM} from "../../domain/models/Trading";
import {generateRandomOHLC, maxPriceETH_USDC, minPriceETH_USDC, randomNumberBetween} from "./faker_functions";

const mockSortedOrderBookData = (): OrderBookM => {

    const startFromPrice = randomNumberBetween(minPriceETH_USDC, maxPriceETH_USDC);

    const generateSortedOrder = (orderSize: number): {orders: Order[], maxPrice: number, minPrice: number} =>
        [...Array(orderSize)].reduce((curr, _) => {

            const orders = [...curr.orders];
            const newPrice = randomNumberBetween(curr.minPrice, curr.maxPrice);
            const newMinPrice = newPrice;

            orders.push({price: newPrice, volume: randomNumberBetween(10, 15)})

            return {
                orders: orders,
                maxPrice: curr.maxPrice,
                minPrice: newMinPrice
            }

        }, {orders: [] as Order[], maxPrice: maxPriceETH_USDC, minPrice: startFromPrice});

    const asks = generateSortedOrder(5).orders;
    const bids = generateSortedOrder(5).orders.reverse().map(_ => _);

    return {
        asks,
        bids,
        timestamp: new Date()
    }
}

const generateRandomMarketData = (): Market => {
    return {
        timestamp: new Date(),
        lastTradedPrice: randomNumberBetween(minPriceETH_USDC, maxPriceETH_USDC),
        volume: randomNumberBetween(10, 100),
        ohlc: generateRandomOHLC(),
    }
}

// arbitrary
const ORDER_BOOK_RT_INTERVAL = 1000;
const MARKET_RT_INTERVAL = 1000;

export default {
    initOrderBookData: (server: Server) => setInterval(() => server.emit('order_book', mockSortedOrderBookData()), ORDER_BOOK_RT_INTERVAL),
    initMarketData: (server: Server) => setInterval(() => server.emit('market', generateRandomMarketData()), MARKET_RT_INTERVAL),
}