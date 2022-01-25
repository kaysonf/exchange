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
import styled from "styled-components";

const socket = io('http://localhost:5000');

const AppContainer = styled.div`
  .live-data-container {
    display: flex;
    justify-content: space-evenly;

    div {
      margin: 1em;
      padding: 1em;
      width: 100%;
      height: auto;
    }
  }
`

function App() {

    const currency: CurrencyPair = {quote: 'ETH', base: 'USDC'};

    const {status: orderBookConnection, message: orderBook} = useOrderBookWS(socket);
    const orderBookReady = orderBookConnection === 'connected' && orderBook !== null;

    const {status: marketConnection, message: market} = useMarketWs(socket);
    const marketReady = marketConnection === 'connected' && market !== null;

    const [{loading: loadingPositions, data: positions}, getPositions] = usePositionsApi();
    const positionsReady = !loadingPositions && positions !== null;

    useEffect(() => {

        (async () => {
            await getPositions();
        })();

    }, [getPositions]);

    return (
        <AppContainer className="App">


            <OrderEntry currency={currency} onOrderCreated={async () => {
                await getPositions();
            }}/>


            <div className={'live-data-container'}>
                {
                    marketReady && positionsReady ?
                        <Positions
                            positions={positions}
                            currentPrice={market.lastTradedPrice}
                            currency={currency}
                        />
                        :
                        <>positions loading</>
                }

                {
                    marketReady ?
                        <MarketChart tick={{timestamp: market.timestamp, ohlc: market.ohlc}}/>
                        :
                        <>market loading</>
                }


                {
                    orderBookReady ?
                        <OrderBook {...orderBook} currency={currency}/>
                        :
                        <>order book loading</>
                }

            </div>

        </AppContainer>
    );
}

export default App;
