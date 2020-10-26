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

const UpdatePost = () => {
    const classes = useStyle();
    const [image, setImage] = useState("");
    const handleSubmit = (values, action) => {
        console.log(values);
    };

    return (
        <Paper className={classes.pageContent}>
            <Formik
                initialValues={{
                    title: "",
                    name: "",
                    description: "",
                    askingPrice: "",
                    category: "",
                    location: "",
                    status: "",
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
                                        label="Title"
                                        name="title"
                                        value={values.title}
                                        helperText={
                                            errors.title && touched.title
                                                ? errors.title
                                                : ""
                                        }
                                        error={
                                            errors.title && touched.title
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></TextField>

                                    <TextField
                                        variant="outlined"
                                        label="Posted By:"
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
                                        label="Description"
                                        name="description"
                                        multiline
                                        rows={2}
                                        value={values.description}
                                        helperText={
                                            errors.description &&
                                            touched.description
                                                ? errors.description
                                                : ""
                                        }
                                        error={
                                            errors.description &&
                                            touched.description
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></TextField>
                                    <TextField
                                        variant="outlined"
                                        label="Asking Price:"
                                        name="askingPrice"
                                        value={values.askingPrice}
                                        helperText={
                                            errors.askingPrice &&
                                            touched.askingPrice
                                                ? errors.askingPrice
                                                : ""
                                        }
                                        error={
                                            errors.askingPrice &&
                                            touched.askingPrice
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></TextField>
                                    <TextField
                                        variant="outlined"
                                        label="Category:"
                                        name="category"
                                        value={values.category}
                                        helperText={
                                            errors.category && touched.category
                                                ? errors.category
                                                : ""
                                        }
                                        error={
                                            errors.category && touched.category
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></TextField>

                                    <FormControl>
                                        <FormLabel>Status</FormLabel>
                                        <RadioGroup
                                            defaultValue="notSold"
                                            row={true}
                                        >
                                            <FormControlLabel
                                                value="active"
                                                control={
                                                    <Radio color="primary" />
                                                }
                                                label="Sold"
                                            />
                                            <FormControlLabel
                                                value="notSold"
                                                control={
                                                    <Radio color="default" />
                                                }
                                                label="Not Sold"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.profile}>
                                        <div className="image-wrapper">
                                            <img
                                                src="/no-profile.jpg"
                                                className="profile-image"
                                            />
                                            <input
                                                type="file"
                                                id="imageInput"
                                                // hidden="hidden"
                                            />
                                            <img
                                                src="/no-profile.jpg"
                                                className="profile-image"
                                            />
                                            <input
                                                type="file"
                                                id="imageInput"
                                                // hidden="hidden"
                                            />
                                            <img
                                                src="/no-profile.jpg"
                                                className="profile-image"
                                            />
                                            <input
                                                type="file"
                                                id="imageInput"
                                                // hidden="hidden"
                                            />
                                        </div>
                                    </div>

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

export default UpdatePost;
