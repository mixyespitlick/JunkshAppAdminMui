import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    makeStyles,
    Paper,
    Radio,
    RadioGroup,
    TextField,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const useStyle = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {
            width: "80%",
            margin: theme.spacing(1),
            color: "primary",
        },
    },
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    profile: {
        "& .image-wrapper": {
            position: "relative",
            "& button": {
                position: "absolute",
                top: "80%",
                left: "70%",
            },
        },
        "& .profile-image": {
            width: 200,
            height: 200,
            objectFit: "cover",
            maxWidth: "100%",
            borderRadius: "50%",
        },
        // width: 200,
        // height: 200,20
        // objectFit: "cover",
        // borderRadius: "50%",
    },
    button: {
        margin: theme.spacing(0.5),
    },
}));

const AddUserSchema = Yup.object().shape({});

const AddBid = () => {
    const classes = useStyle();
    const [image, setImage] = useState("");
    const handleSubmit = (values, action) => {
        console.log(values);
    };

    return (
        <Paper className={classes.pageContent}>
            <Formik
                initialValues={{
                    name: "",
                    amount: "",
                    post: "",
                    isWinner: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={AddUserSchema}
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
                            className={classes.root}
                            autoComplete="off"
                            noValidate
                        >
                            <Grid container>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="Bidder"
                                        name="name"
                                        value={values.name}
                                        helperText={
                                            errors.name && touched.name
                                                ? errors.name
                                                : ""
                                        }
                                        error={
                                            errors.name && touched.name
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></TextField>

                                    <TextField
                                        variant="outlined"
                                        label="Amount:"
                                        name="amount"
                                        value={values.amount}
                                        helperText={
                                            errors.amount && touched.amount
                                                ? errors.amount
                                                : ""
                                        }
                                        error={
                                            errors.amount && touched.amount
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></TextField>
                                    <TextField
                                        variant="outlined"
                                        label="Post:"
                                        name="post"
                                        value={values.post}
                                        helperText={
                                            errors.post && touched.post
                                                ? errors.post
                                                : ""
                                        }
                                        error={
                                            errors.post && touched.post
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl>
                                        <FormLabel>Winner</FormLabel>
                                        <RadioGroup
                                            defaultValue="notWinner"
                                            row={true}
                                        >
                                            <FormControlLabel
                                                value="winner"
                                                control={
                                                    <Radio color="primary" />
                                                }
                                                label="Winner"
                                            />
                                            <FormControlLabel
                                                value="notWinner"
                                                control={
                                                    <Radio color="default" />
                                                }
                                                label="notWinner"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <div>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            disabled={isSubmitting}
                                        >
                                            Submit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="default"
                                            className={classes.button}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </Paper>
    );
};

export default AddBid;
