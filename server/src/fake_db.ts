import {PositionM} from "../../domain/models/Trading";

const positions: PositionM[] = [
    {pair: ['ETH', 'USD'], priceAcquired: 1, quantity: 5},
    {pair: ['ETH', 'USD'], priceAcquired: 1, quantity: 5},
];

export default {
    getPositions: () => positions
}