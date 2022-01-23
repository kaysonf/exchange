import React, {FC} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Order} from "../../../../domain/models/Trading";

type OrdersProps = {
    type: 'ask' | 'bid';
    orders: Order[];
    currency: string;
}

const Orders: FC<OrdersProps> = (props) => {

    const {orders, currency, type} = props
    //TODO: type for color - ask red, bid green

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">

                <TableHead>
                    <TableRow>
                        <TableCell>Price</TableCell>

                        <TableCell align="right">Quantity</TableCell>

                        <TableCell align="right">Total ({currency})</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {orders.map((order) => (
                        <TableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {order.price}
                            </TableCell>

                            <TableCell align="right">{order.volume}</TableCell>

                            <TableCell align="right">{order.price * order.volume}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Orders