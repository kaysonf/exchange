import {FC, useState} from "react";
import {CurrencyPair, OrderTicket, OrderType} from "../../../../domain/models/Trading";
import SelectBuySell from "./SelectBuySell";
import {Button, TextField, Typography} from "@mui/material";
import {useCreateOrderApi} from "../../API";
import styled from "styled-components";

const StyledOrderEntry = styled.div`
  display: inline-grid;

  align-content: center;
  
  div[role=group] {
    margin-bottom: 6em;
    display: flex;
    justify-content: space-evenly;
    button {
      width: 100%
    }
  }
  
  #create-order {
    margin-top: 1em;
  }
`;

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
        <StyledOrderEntry>

            <Typography variant="h3" gutterBottom component="h6">
                Order Entry
            </Typography>

            <SelectBuySell orderType={orderType} onSelect={setOrderType}/>

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


            <Button id={'create-order'} disabled={!oderIsValid} variant="contained" onClick={async () => {

                try {
                    const order = await createOrder({price: orderPrice, volume: orderQty, type: orderType});
                    onOrderCreated(order);
                } catch (e) {
                    alert(e);
                }

            }}>Create {orderType} Order</Button>
        </StyledOrderEntry>

    )

}

export default OrderEntry;