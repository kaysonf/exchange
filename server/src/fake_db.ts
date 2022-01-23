import {OrderTicket, PositionM} from "../../domain/models/Trading";

const positions: PositionM[] = [];

const updateCurrentPosition = (orderTicket: OrderTicket): Promise<OrderTicket> => {
    return new Promise<OrderTicket>((resolve, reject) => {
        const ETH_USDC = positions[0];

        // since this is just a mock, no need to check and match pricing...
        switch (orderTicket.type) {
            case 'buy':
                ETH_USDC.spent += orderTicket.volume * orderTicket.price;
                break;
            case 'sell': {
                if (ETH_USDC.quantity >= orderTicket.volume) {
                    ETH_USDC.spent -= orderTicket.volume * orderTicket.price;
                } else {
                    return reject('not enough qty');
                }
                break;
            }
        }

        ETH_USDC.quantity += orderTicket.volume;

        positions[0] = ETH_USDC;

        return resolve(orderTicket);
    });
}

const createNewPosition = (orderTicket: OrderTicket): Promise<OrderTicket> => {

    return new Promise<OrderTicket>((resolve, reject) => {
        if (orderTicket.type === 'sell')
            reject('no qty to sell');

        positions.push(
            {pair: {quote: 'ETH', base: 'USDC'}, spent: orderTicket.volume * orderTicket.price, quantity: orderTicket.volume}
        );

        resolve(orderTicket);
    });
}

export default {
    getPositions: async (): Promise<PositionM[]> => positions,

    createOrder: async (orderTicket: OrderTicket): Promise<OrderTicket> => {

        if (positions.length === 1) {
            return updateCurrentPosition(orderTicket);
        }

        return createNewPosition(orderTicket);
    },

    resetDB: () => {
        if (positions.length > 0)
            positions.pop();
    }
}