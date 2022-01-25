import {OrderTicket, PositionM} from "../../domain/models/Trading";

const positions: PositionM[] = [];

const updateCurrentPosition = (orderTicket: OrderTicket): Promise<OrderTicket> => {
    return new Promise<OrderTicket>((resolve, reject) => {
        const ethUsdc = positions[0];

        // since this is just a mock, no need to check and match pricing...
        switch (orderTicket.type) {
            case 'buy':
                ethUsdc.spent += orderTicket.volume * orderTicket.price;
                break;
            case 'sell': {
                if (ethUsdc.quantity >= orderTicket.volume) {
                    ethUsdc.spent -= orderTicket.volume * orderTicket.price;
                } else {
                    return reject('not enough qty');
                }
                break;
            }
        }

        ethUsdc.quantity += orderTicket.volume;

        positions[0] = ethUsdc;

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