import React, {useEffect} from 'react';
import './App.css';
import OrderBook from "./components/order-book/OrderBook";
import Positions from "./components/positions/Positions";
import {usePositionsApi} from "./API";

import io from 'socket.io-client';
import {useMarketWs, useOrderBookWS} from "./WebSocket";
import OrderEntry from "./components/order-entry-ticket/OrderEntry";
import {CurrencyPair} from "../../domain/models/Trading";
import MarketChart from "./components/market-chart/MarketChart";

const socket = io('http://localhost:5000');

function App() {

    const currency: CurrencyPair = {quote: 'ETH', base: 'USDC'};

    const {status: orderBookConnection, message: orderBook} = useOrderBookWS(socket);

    const {status: marketConnection, message: market} = useMarketWs(socket);

    const [{loading: loadingPositions, data: positions}, getPositions] = usePositionsApi();

    useEffect(() => {

        (async () => {
            await getPositions();
        })();

    }, [getPositions]);


    const renderPositions = () => {
        if (loadingPositions || positions === null)
            return <>loading positions...</>

        if (marketConnection !== 'connected' || market === null)
            return <>loading market...</>

        return (
            <Positions positions={positions} currentPrice={market.lastTradedPrice} currency={currency}/>
        );
    }

    return (
        <div className="App">

            {renderPositions()}

            {marketConnection === 'connected' ?
                market !== null && <MarketChart tick={{timestamp: market.timestamp, ohlc: market.ohlc}}/>
                :
                <>market loading</>
            }

            {orderBookConnection === 'connected' ?
                orderBook !== null && <OrderBook {...orderBook} currency={currency}/>
                :
                <>order book loading</>
            }

            <OrderEntry currency={currency} onOrderCreated={async () => {
                await getPositions();
            }}/>

        </div>
    );
}

export default App;
