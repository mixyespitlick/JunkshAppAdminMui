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
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { projectFirestore } from "../../config/firebase";
import PageHeader from "../templates/PageHeader";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";

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

export default function UserList() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [search, setSearch] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [users, setUsers] = useState([]);
    const [activeState, setActiveState] = useState("");

    const handleActiveChange = (event) => {
        setActiveState(false);
    };

    // const handleActiveChange = (event) => {
    //     setActiveState(!true);
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getDataFromFirestore = () => {
        projectFirestore
            .collection("users")
            .orderBy("timestamp", "desc")
            .onSnapshot((doc) => {
                let users = [];
                doc.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id });
                    console.log("check users", users);
                });
                setUsers(users);
                setActiveState(users.active);
            });
    };

    useEffect(() => {
        getDataFromFirestore();
    }, []);

    return (
        <>
            <PageHeader
                title="Users"
                subtitle="Users Table"
                icon={<PeopleOutlineTwoTone fontsize="large" />}
            />
            <Grid container>
                <Grid xs={12} sm={6}>
                    {" "}
                    <Paper component="form" className={classes.rootSearch}>
                        <InputBase
                            className={classes.input}
                            placeholder="Seach Users"
                            inputProps={{ "aria-label": "Seach Users" }}
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
                    <Link to="/dashboard/users/create">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<Add />}
                        >
                            Create User
                        </Button>
                    </Link>
                </Grid>
            </Grid>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>User Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Verified</TableCell>
                                <TableCell>Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .filter(
                                    (users) =>
                                        users.name
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ||
                                        users.email
                                            .toLowerCase()
                                            .includes(search.toLowerCase())
                                )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((users, i) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={i}
                                        >
                                            <TableCell>{users.email}</TableCell>
                                            <TableCell>{users.name}</TableCell>
                                            <TableCell>
                                                {users.usertype}
                                            </TableCell>
                                            <TableCell>
                                                {users.active
                                                    ? "Active"
                                                    : "Inactive"}
                                                {/* <FormControlLabel
                                                    control={
                                                        <Switch
                                                            key={users.id}
                                                            checked={
                                                                activeState
                                                            }
                                                            onChange={
                                                                handleActiveChange
                                                            }
                                                            name="active"
                                                            color="primary"
                                                        />
                                                    }
                                                    label={
                                                        users.active
                                                            ? "Active"
                                                            : "Inactive"
                                                    }
                                                /> */}
                                            </TableCell>
                                            <TableCell>
                                                {users.verified
                                                    ? "Verified"
                                                    : "Not Verified"}
                                                {/* <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={
                                                                users.verified
                                                            }
                                                            // onChange={
                                                            //     handleChange
                                                            // }
                                                            name="verified"
                                                            color="primary"
                                                        />
                                                    }
                                                    label={
                                                        users.verified
                                                            ? "Verified"
                                                            : "Not verified"
                                                    }
                                                /> */}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    component={Link}
                                                    to={`/dashboard/users/update/${users.id}`}
                                                >
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
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}
