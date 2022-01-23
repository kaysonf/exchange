export type CurrencyPair = {
    quote: string;
    base: string;
};

export type OrderType = 'buy' | 'sell';

export type Order = {
    price: number;
    volume: number;
}

export type OrderTicket = Order & {
    type: OrderType;
}

export type OrderBookM = { // rt
    asks: Order[];
    bids: Order[];
    timestamp: Date;
}

export type Market = { // rt
    timestamp: Date;
    ohlc: OHLC;
    lastTradedPrice: number;
    volume: number;
}

export type OHLC = [number, number, number, number];

export type PositionM = {
    pair: CurrencyPair;
    spent: number;
    quantity: number
}

