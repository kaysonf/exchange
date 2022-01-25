import React, {FC} from "react";
import {CurrencyPair, OrderBookM} from "../../../../domain/models/Trading";
import Orders from "./Orders";
import {Paper, TableContainer, Typography} from "@mui/material";

type OrderBookProps = OrderBookM & {
    currency: CurrencyPair;
};

const OrderBook: FC<OrderBookProps> = (props) => {
    const {asks, bids, currency} = props;

    // price * amount, total
    return (
        <TableContainer component={Paper}>
            <Typography variant="h3" gutterBottom component="h6">
                Bids
            </Typography>
            <Orders type={'buy'} orders={bids} currency={currency}/>

            <Typography variant="h3" gutterBottom component="h6">
                Asks
            </Typography>
            <Orders type={'sell'} orders={asks} currency={currency}/>
        </TableContainer>
    );
}

export default OrderBook