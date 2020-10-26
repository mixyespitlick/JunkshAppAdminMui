import { Button, Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Add, Edit, PeopleOutlineTwoTone } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectFirestore } from "../../config/firebase";
import PageHeader from "../templates/PageHeader";

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
    rootSearch: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const BidList = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [search, setSearch] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [bids, setBids] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getDataFromFirestore = () => {
        // projectFirestore
        //     .collectionGroup("bidding")
        //     .orderBy("desc")
        //     .onSnapshot((doc) => {
        //         let bids = [];
        //         doc.forEach((doc) => {
        //             bids.push({ ...doc.data(), id: doc.id });
        //             console.log("check users", bids.id);
        //         });
        //         setBids(bids);
        //     });
    };

    useEffect(() => {
        getDataFromFirestore();
    }, []);

    return (
        <>
            <PageHeader
                title="Bids"
                subtitle="Bids Table"
                icon={<PeopleOutlineTwoTone fontsize="large" />}
            />
            <Grid container>
                <Grid xs={12} sm={6}>
                    {" "}
                    <Paper component="form" className={classes.rootSearch}>
                        <InputBase
                            className={classes.input}
                            placeholder="Seach Bids"
                            inputProps={{ "aria-label": "Seach Bids" }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <IconButton
                            type="submit"
                            className={classes.iconButton}
                            aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid xs={12} sm={6} container justify="flex-end">
                    <Link to="/dashboard/bids/create">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<Add />}
                        >
                            Create Bid
                        </Button>
                    </Link>
                </Grid>
            </Grid>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Amount</TableCell>
                                {/* <TableCell>Email</TableCell>
                                <TableCell>User Type</TableCell>
                                <TableCell>Update</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bids
                                .filter((bids) =>
                                    bids.amount
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((bids) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={bids.id}
                                        >
                                            <TableCell>
                                                {bids.bidder.amount}
                                            </TableCell>
                                            {/* <TableCell>{users.email}</TableCell>
                                            <TableCell>
                                                {users.usertype}
                                            </TableCell> */}
                                            <TableCell>
                                                <IconButton>
                                                    <Edit />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={bids.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
};

export default BidList;
