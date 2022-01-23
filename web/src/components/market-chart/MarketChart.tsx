import {FC, useEffect, useReducer} from "react";
import {OHLC} from "../../../../domain/models/Trading";

import {VictoryAxis, VictoryCandlestick, VictoryChart, VictoryTheme} from 'victory';
import {useMarketDataApi} from "../../API";

type CandleStick = { x: Date, open: number, high: number, close: number, low: number };

type Tick = {
    timestamp: Date;
    ohlc: OHLC;
}
type MarketChartProps = {
    tick: Tick
}

type Action =
    | { type: 'tick', tick: Tick }
    | { type: 'init', candleSticks: CandleStick[] }

const candleStickReducer = (series: CandleStick[], action: Action) => {
    switch (action.type) {
        case 'tick': {
            const {tick} = action;
            return [...series.slice(-50), {
                x: tick.timestamp,
                open: tick.ohlc[0],
                high: tick.ohlc[1],
                low: tick.ohlc[2],
                close: tick.ohlc[3]
            }]
        }

        case "init":
            return [...action.candleSticks]
    }
}

const MarketChart: FC<MarketChartProps> = ({tick}) => {

    const [,requestHistoricalMarketData] = useMarketDataApi();

    const [dataPoints, dispatch] = useReducer(candleStickReducer, [] as CandleStick[])

    useEffect(() => {

        (async () => {
            const marketData = await requestHistoricalMarketData();

            const candleSticks: CandleStick[] = marketData.map(data => {
                const {timestamp, ohlc} = data;
                return {
                    x: timestamp,
                    open: ohlc[0],
                    high: ohlc[1],
                    low: ohlc[2],
                    close: ohlc[3]
                }
            })
            dispatch({type: 'init', candleSticks})
        })();

    }, [requestHistoricalMarketData, dispatch])


    useEffect(() => {
        dispatch({type: 'tick', tick});
    }, [tick, dispatch]);


    return (
        <>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{x: 25}}
                scale={{x: 'time'}}
                // height={300}
                width={1000}
            >
                <VictoryAxis dependentAxis/>
                <VictoryAxis dependentAxis/>

                <VictoryCandlestick
                    candleColors={{positive: "#0d9b12", negative: "#c43a31"}}
                    data={dataPoints}
                />

            </VictoryChart>
        </>
    )
}

export default MarketChart