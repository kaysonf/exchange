import {OHLC} from "../../domain/models/Trading";

export const minPriceETH_USDC = 5120;
export const maxPriceETH_USDC = 5130;

export const randomNumberBetween = (min: number, max: number) => {
    const r = Math.random() * (max - min + 1) + min;
    return Math.round((r + Number.EPSILON) * 100) / 100;
}

export const generateRandomOHLC = (): OHLC => {

    const open = randomNumberBetween(minPriceETH_USDC, maxPriceETH_USDC);
    const high = randomNumberBetween(open, open + 5);
    const low = randomNumberBetween(open - 5, open);
    const close = randomNumberBetween(low, high);

    return [open, high, low, close];
}
