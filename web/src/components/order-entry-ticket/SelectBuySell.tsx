import {FC, useRef, useState} from "react";
import {Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {OrderType} from "../../../../domain/models/Trading";


type SelectBuySellProps = {
    onSelect: (type: OrderType) => void;
    orderType: OrderType;
}

const SelectBuySell: FC<SelectBuySellProps> = ({onSelect, orderType}) => {

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);


    const options: OrderType[] = ['buy', 'sell'];

    const [selectedOrderType, setSelectedOrderType] = useState<OrderType>('buy');

    const handleClick = (orderType: OrderType) => {
        setSelectedOrderType(orderType);
        onSelect(orderType);
        setOpen(false);
    };


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button disabled={true} variant={'text'} style={{backgroundColor: orderType === 'buy' ?  '#8cdba0' : '#cf6262'}}>{selectedOrderType}</Button>

                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon/>
                </Button>
            </ButtonGroup>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option) => (
                                        <MenuItem
                                            key={option}
                                            selected={option === selectedOrderType}
                                            onClick={() => handleClick(option)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}

export default SelectBuySell;