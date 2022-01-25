import {FC} from "react";
import {CurrencyPair, PositionM} from "../../../../domain/models/Trading";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

type PositionsProps = {
    positions: PositionM[];
    currentPrice: number;
    currency: CurrencyPair;
}

const Positions: FC<PositionsProps> = (props) => {

    const {positions, currentPrice, currency} = props;

    return (
        <TableContainer component={Paper}>

            <Typography variant="h3" gutterBottom component="h6">
                Positions
            </Typography>

            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">

                <TableHead>
                    <TableRow>
                        <TableCell>Pair</TableCell>
                        <TableCell align="right">Position ({currency.base})</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {positions.map((pos, i) => (
                        <TableRow
                            key={i}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {pos.pair.quote}/{pos.pair.base}
                            </TableCell>

                            <TableCell align="right">
                                {((currentPrice - pos.spent) * pos.quantity).toFixed(2)}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Positions