import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import CustomAlert from "../templates/CustomAlert";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="#">
                JunkshApp
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: "url('/Splash2.png')",
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "contain",
        backgroundPosition: "center",
        snackBarWidth: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.success.dark,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorMessage: { color: "red" },
}));

const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required("Enter valid email-id"),
    password: Yup.string().required("Required"),
});

export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [alertType, setAlertType] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");
    // const [isUser, setIsUser] = React.useState(false);

    const handleSubmit = (values, actions) => {
        setAlertType("");
        setAlertMessage("");
        //proper login
        // projectAuth
        //     .signInWithEmailAndPassword(values.email, values.password)
        //     .then(() => {
        //         history.push("/dashboard/home");
        //         setAlertType("success");
        //         setAlertMessage("Login successfull. Welcome admin.");
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         // alert("Incorrect username or password");
        //         setAlertType("error");
        //         setAlertMessage("Incorrect usename or password");
        //         console.log(alertType, alertMessage);
        //         actions.setSubmitting(false);
        //     });

        //dirty login
        if (values.email === "admin@admin.com" && values.password === "admin") {
            history.push("/dashboard/home");
            setAlertType("success");
            setAlertMessage("Login successfull. Welcome admin.");
        } else {
            setAlertType("error");
            setAlertMessage("Incorrect usename or password");
            //         console.log(alertType, alertMessage);
            actions.setSubmitting(false);
        }
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    {alertMessage && (
                        <CustomAlert
                            type={alertType}
                            message={alertMessage}
                            autoClose={5000}
                        ></CustomAlert>
                    )}
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={handleSubmit}
                        validationSchema={LoginSchema}
                    >
                        {(props) => {
                            const {
                                values,
                                touched,
                                errors,
                                handleBlur,
                                handleChange,
                                isSubmitting,
                            } = props;
                            return (
                                <Form
                                    className={classes.form}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        // required
                                        fullWidth
                                        id="email"
                                        label="Enter Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={values.email}
                                        helperText={
                                            errors.email && touched.email
                                                ? errors.email
                                                : ""
                                        }
                                        error={
                                            errors.email && touched.email
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        // onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        // required
                                        fullWidth
                                        name="password"
                                        label="Enter Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={values.password}
                                        helperText={
                                            errors.password && touched.password
                                                ? errors.password
                                                : ""
                                        }
                                        error={
                                            errors.password && touched.password
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        // onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {/* <FormControlLabel
                                control={
                                    <Checkbox value="remember" color="primary" />
                                }
                                label="Remember me"
                            /> */}

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        className={classes.submit}
                                        // disabled={isSubmitting}
                                        // onClick={handleSubmit}
                                    >
                                        Log In
                                    </Button>

                                    <Box mt={5}>
                                        <Copyright />
                                    </Box>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </Grid>
        </Grid>
    );
}
