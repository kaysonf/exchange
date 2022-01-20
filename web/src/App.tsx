import React from 'react';
import './App.css';
import OrderBook from "./components/order-book/OrderBook";
import {OrderBookM, PositionM} from "./model/Trading";
import Positions from "./components/positions/Positions";

function App() {

    const orderBookData: OrderBookM = {
        asks: [
            {price: 1, volume: 2},
            {price: 3, volume: 4},
            {price: 5, volume: 6},
        ],

        bids: [
            {price: 1, volume: 2},
            {price: 3, volume: 4},
            {price: 5, volume: 6},
        ],

        timestamp: 123
    };

    const positions: PositionM[] = [
        {pair: ['ETH', 'BTC'], priceAcquired: 1, quantity: 5},
        {pair: ['ETH', 'USD'], priceAcquired: 1, quantity: 5},
        {pair: ['ETH', 'CRO'], priceAcquired: 1, quantity: 5},
    ];

    const currency = 'ETH';

    const currentPrice = 5;

    return (
        <div className="App">
            <Positions positions={positions} currentPrice={currentPrice}/>
            <OrderBook {...orderBookData} currency={currency}/>
        </div>
    );
}

export default App;
