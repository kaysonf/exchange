type PricePair = [number, number];
type CurrencyPair = [string, string];

export type Order = {
    price: number;
    volume: number;
}

export type OrderBookM = { // rt
    asks: Order[];
    bids: Order[];
    timestamp: number; //FIXME: date
}

export type Market = { // rt
    lastTradedPrice: PricePair;
    volume: number;
}

export type PositionM = {
    pair: CurrencyPair;
    priceAcquired: number;
    quantity: number
}

