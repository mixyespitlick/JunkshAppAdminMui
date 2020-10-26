import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, amount) {
    return { id, date, name, shipTo, amount };
}

const rows = [
    createData(0, "10 August, 2020", "Shem Placa", "Ma-a, Davao City", 312.44),
    createData(1, "10 August, 2020", "Shem Placa", "Ma-a, Davao City", 866.99),
    createData(
        2,
        "10 August, 2020",
        "Arniel Mascarinas",
        "Ma-a, Davao City",
        100.81
    ),
    createData(
        3,
        "10 August, 2020",
        "Arniel Mascarinas",
        "Ma-a, Davao City",
        654.39
    ),
    createData(
        4,
        "09 August, 2020",
        "Kim Varona",
        "Bangkal, Davao City",
        212.79
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Orders() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Recent Won Bids</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">Sold Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.shipTo}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                {/* <Link color="primary" href="#" onClick={preventDefault}>
                    See more orders
                </Link> */}
            </div>
        </React.Fragment>
    );
}
