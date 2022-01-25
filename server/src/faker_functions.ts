import {OHLC} from "../../domain/models/Trading";

export const minPriceEthUsdc = 5120;
export const maxPriceEthUsdc = 5130;

export const randomNumberBetween = (min: number, max: number) => {
    const r = Math.random() * (max - min + 1) + min;
    return Math.round((r + Number.EPSILON) * 100) / 100;
}

export const generateRandomOHLC = (): OHLC => {

    const open = randomNumberBetween(minPriceEthUsdc, maxPriceEthUsdc);
    const high = randomNumberBetween(open, open + 5);
    const low = randomNumberBetween(open - 5, open);
    const close = randomNumberBetween(low, high);

    return [open, high, low, close];
}
