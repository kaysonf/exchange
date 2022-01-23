import React, {useEffect} from 'react';
import './App.css';
import OrderBook from "./components/order-book/OrderBook";
import Positions from "./components/positions/Positions";
import {usePositionsApi} from "./API";

import io from 'socket.io-client';
import {useMarketWs, useOrderBookWS} from "./WebSocket";

const socket = io('http://localhost:5000');

function App() {

    const {status: orderBookConnection, message: orderBook} = useOrderBookWS(socket);

    const {status: marketConnection, message: market} = useMarketWs(socket); // chart

    const [{loading: loadingPositions, data: positions}, getPositions] = usePositionsApi();

    useEffect(() => {

        (async () => {
            await getPositions();
        })();

    }, [getPositions]);

    const currency = 'ETH';

    const currentPrice = market?.lastTradedPrice;

    return (
        <div className="App">
            {loadingPositions ?
                <>loading positions</>
                :
                positions !== null && currentPrice && <Positions positions={positions} currentPrice={currentPrice[0]}/>
            }

            {orderBookConnection === 'connected' ?
                orderBook !== null && <OrderBook {...orderBook} currency={currency}/>
                :
                <>order book loading</>
            }

        </div>
    );
}

export default App;
