import {FC} from "react";
import {PositionM} from "../../model/Trading";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

type PositionsProps = {
    positions: PositionM[];
    currentPrice: number;
}

const Positions: FC<PositionsProps> = (props) => {

    const {positions, currentPrice} = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">

                <TableHead>
                    <TableRow>
                        <TableCell>Pair</TableCell>
                        <TableCell align="right">Position</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {positions.map((pos) => (
                        <TableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {pos.pair}
                            </TableCell>

                            <TableCell align="right">
                                {(currentPrice - pos.priceAcquired) * pos.quantity}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Positions