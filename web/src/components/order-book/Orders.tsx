import React, {FC} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {CurrencyPair, Order} from "../../../../domain/models/Trading";

type OrdersProps = {
    type: 'ask' | 'bid';
    orders: Order[];
    currency: CurrencyPair;
}

const Orders: FC<OrdersProps> = (props) => {

    const {orders, currency, type} = props
    //TODO: type for color - ask red, bid green

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">

                <TableHead>
                    <TableRow>
                        <TableCell>Price ({currency.base})</TableCell>

                        <TableCell align="right">Quantity</TableCell>

                        <TableCell align="right">Total ({currency.base})</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {orders.map((order, i) => (
                        <TableRow
                            key={i}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {order.price}
                            </TableCell>

                            <TableCell align="right">{order.volume}</TableCell>

                            <TableCell align="right">{(order.price * order.volume).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Orders