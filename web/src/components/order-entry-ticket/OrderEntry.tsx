import {FC, useState} from "react";
import {CurrencyPair, OrderTicket, OrderType} from "../../../../domain/models/Trading";
import SelectBuySell from "./SelectBuySell";
import {Button, TextField} from "@mui/material";
import {useCreateOrderApi} from "../../API";

type OrderEntryProps = {
    currency: CurrencyPair;
    onOrderCreated: (order: OrderTicket) => void;
}
const OrderEntry: FC<OrderEntryProps> = ({currency, onOrderCreated}) => {

    const [, createOrder] = useCreateOrderApi();

    const [orderPrice, setOrderPrice] = useState<number>(0);
    const [orderQty, setOrderQty] = useState<number>(0);

    const [orderType, setOrderType] = useState<OrderType>('buy');

    const oderIsValid = orderPrice > 0 && orderQty > 0;

    return (
        <>
            <TextField
                id="outlined-number"
                label={`Price (${currency.base})`}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}

                onChange={e => setOrderPrice(Number(e.target.value))}
            />
            <TextField
                id="outlined-number"
                label="Quantity"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}

                onChange={e => setOrderQty(Number(e.target.value))}
            />
            <SelectBuySell onSelect={setOrderType}/>

            <Button disabled={!oderIsValid} variant="contained" onClick={async () => {

                try {
                    const order = await createOrder({price: orderPrice, volume: orderQty, type: orderType});
                    onOrderCreated(order);
                } catch (e) {
                    alert(e);
                }

            }}>Create {orderType} Order</Button>
        </>

    )

}

export default OrderEntry;