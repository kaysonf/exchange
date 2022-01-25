import React, {FC} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {CurrencyPair, Order, OrderType} from "../../../../domain/models/Trading";
import {TableCellProps} from "@mui/material/TableCell/TableCell";

type OrdersProps = {
    type: OrderType;
    orders: Order[];
    currency: CurrencyPair;
}

const OrderCell: FC<TableCellProps & { type: OrderType }> = (props) => {
    return <TableCell {...props} style={{backgroundColor: props.type === 'buy' ? '#8cdba0' : '#cf6262'}}/>;
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
                            <OrderCell component="th" scope="row" type={type}>
                                {order.price}
                            </OrderCell>

                            <OrderCell align="right" type={type}>{order.volume}</OrderCell>

                            <OrderCell align="right" type={type}>{(order.price * order.volume).toFixed(2)}</OrderCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Orders