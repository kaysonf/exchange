import React, {FC} from "react";
import {CurrencyPair, OrderBookM} from "../../../../domain/models/Trading";
import Orders from "./Orders";
import {Paper, TableContainer} from "@mui/material";

type OrderBookProps = OrderBookM & {
    currency: CurrencyPair;
};

const OrderBook: FC<OrderBookProps> = (props) => {
    const {asks, bids, currency} = props;

    // price * amount, total
    return (
        <TableContainer component={Paper}>
            <Orders type={'bid'} orders={bids} currency={currency}/>

            <Orders type={'ask'} orders={asks} currency={currency}/>
        </TableContainer>
    );
}

export default OrderBook