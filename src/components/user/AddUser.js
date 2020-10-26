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
import { Field, Form, Formik, useField } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import {
    projectAuth,
    projectFirestore,
    projectStorage,
} from "../../config/firebase";
import { useHistory, Link } from "react-router-dom";

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
        // height: 200,
        // objectFit: "cover",
        // borderRadius: "50%",
    },
    button: {
        margin: theme.spacing(0.5),
    },
}));

const takenEmailAddresses = [
    "test@test.com",
    "test1@test.com",
    "test2@test.com",
    "test3@test.com",
];

const AddUserSchema = Yup.object().shape({
    email: Yup.string()
        .email("Must be a valid email!")
        .notOneOf(takenEmailAddresses, "Email already taken")
        .required("Required"),
    name: Yup.string().min(2, "To short!").required("Required"),
    password: Yup.string()
        .min(6, "Password must be atleast 6 characters!")
        .required("Required"),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Password must be the same!")
        .min(6, "Password must be atleast 6 characters!")
        .required("Required"),
    about: Yup.string().required("Required"),
    active: Yup.string().required("Required"),
    // rating: Yup.string().required("Required"),
    // stat1: Yup.string().required("Required"),
    // stat2: Yup.string().required("Required"),
});

const statusOptions = [
    { label: "Active", value: "true" },
    { label: "In Active", value: "false" },
];

const MyRadio = ({ label, checked, ...props }) => {
    const [field] = useField(props);
    return (
        <FormControlLabel
            {...field}
            control={<Radio color="primary" />}
            label={label}
        />
    );
};

const CustomRadio = ({
    checked,
    disabled,
    id,
    inputRef,
    label,
    onChange,
    value,
    className,
}) => (
    <FormControlLabel
        control={
            <Radio
                checked={checked}
                color="primary"
                disabled={disabled}
                id={id}
                inputRef={inputRef}
                value={value}
                onChange={onChange}
                // className={classNames({ [className]: className })}
                data-testid="radio"
            />
        }
        label={label}
        labelPlacement="end"
    />
);

const FormikRadioGroup = ({
    field,
    form: { touched, errors },
    name,
    label,
    options,
    onChange,
    ...props
}) => {
    const fieldName = name || field.name;

    return (
        <React.Fragment>
            <FormControl component="fieldset">
                <FormLabel component="legend">{label}</FormLabel>
                <RadioGroup {...field} {...props} name={fieldName}>
                    {options.map((option) => (
                        <CustomRadio
                            value={option.value}
                            checked={field.value === option.value}
                            onChange={field.onChange}
                            label={option.label}
                            id={fieldName}
                        />
                    ))}
                </RadioGroup>
            </FormControl>

            {touched[fieldName] && errors[fieldName] && (
                <React.Fragment>{errors[fieldName]}</React.Fragment>
            )}
        </React.Fragment>
    );
};

const convertToBoolean = (value) => {
    if (value == "true") {
        return true;
    } else {
        return false;
    }
};

const AddUser = () => {
    const classes = useStyle();
    const [profileImage, setProfileImage] = useState("/no-profile.jpg");
    const history = useHistory();

    return (
        <Paper className={classes.pageContent}>
            <Formik
                initialValues={{
                    about: "",
                    // boolean
                    active: true,
                    avatar: "",
                    email: "",
                    name: "",
                    password: "",
                    passwordConfirm: "",
                    rating: 5,
                    stat1: 0,
                    stat2: 0,
                    uploadedfile: "",
                    usertype: "",
                    // boolean
                    verified: false,
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(convertToBoolean(values.active));
                    const {
                        name,
                        email,
                        password,
                        avatar,
                        about,
                        uploadedfile,
                        verified,
                        active,
                        stat1,
                        stat2,
                        rating,
                        usertype,
                    } = values;

                    projectAuth
                        .createUserWithEmailAndPassword(email, password)
                        .then((cred) => {
                            // create new user
                            return new Promise((resolve, reject) => {
                                let userID = cred.user.uid;
                                projectFirestore
                                    .collection("users")
                                    .doc(userID)
                                    .set({
                                        name: name,
                                        email: email,
                                        avatar: "",
                                        id: userID,
                                        about: about,
                                        uploadedfile: uploadedfile,
                                        verified: convertToBoolean(verified),
                                        active: convertToBoolean(active),
                                        stat1: stat1,
                                        stat2: stat2,
                                        rating: rating,
                                        timestamp: "",
                                        usertype: usertype,
                                    });
                                resolve(userID);
                            });
                        })
                        .then((userID) => {
                            // this will run if rules on storage:
                            // allow read, write: if true
                            return projectStorage
                                .ref(`avatars/${userID}`)
                                .put(avatar)
                                .on(
                                    "state_changed",
                                    (snapshot) => {
                                        console.log(snapshot);
                                    },
                                    (error) => {
                                        console.log(error);
                                    },
                                    () =>
                                        projectStorage
                                            .ref("avatars")
                                            .child(userID)
                                            .getDownloadURL()
                                            .then((url) => {
                                                return projectFirestore
                                                    .collection("users")
                                                    .doc(userID)
                                                    .set(
                                                        { avatar: url },
                                                        { merge: true }
                                                    );
                                            })
                                );
                        })
                        .then(() => {
                            // useHistory hook to go back instead of
                            // history.push("dashboard/users")
                            // note: daot pa ni nga above ^ statement
                            history.goBack();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}
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
                        setFieldValue,
                    } = props;
                    return (
                        <Form
                            className={classes.root}
                            autoComplete="off"
                            noValidate
                        >
                            <Grid container>
                                <Grid item xs={6}>
                                    <div className={classes.profile}>
                                        <div className="image-wrapper">
                                            <div>
                                                <FormLabel>Avatar</FormLabel>
                                            </div>
                                            <img
                                                src={profileImage}
                                                className="profile-image"
                                            />
                                            <Button
                                                variant="contained"
                                                component="label"
                                            >
                                                Upload Image
                                                <input
                                                    type="file"
                                                    name="avatar"
                                                    accept="image/*"
                                                    id="profilePicture"
                                                    style={{ display: "none" }}
                                                    onChange={(event) => {
                                                        //set values file to current selected image
                                                        setFieldValue(
                                                            "avatar",
                                                            event.currentTarget
                                                                .files[0]
                                                        );
                                                        // preview image before uploading
                                                        const reader = new FileReader();
                                                        reader.onload = () => {
                                                            if (
                                                                reader.readyState ===
                                                                2
                                                            ) {
                                                                setProfileImage(
                                                                    reader.result
                                                                );
                                                            }
                                                        };
                                                        reader.readAsDataURL(
                                                            event.target
                                                                .files[0]
                                                        );
                                                    }}
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                    <TextField
                                        variant="outlined"
                                        label="Email"
                                        name="email"
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
                                    ></TextField>

                                    <TextField
                                        variant="outlined"
                                        label="Full Name"
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
                                        label="Password"
                                        name="password"
                                        type="password"
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
                                    ></TextField>
                                    <TextField
                                        variant="outlined"
                                        label="Confirm Password"
                                        name="passwordConfirm"
                                        type="password"
                                        value={values.passwordConfirm}
                                        helperText={
                                            errors.passwordConfirm &&
                                            touched.passwordConfirm
                                                ? errors.passwordConfirm
                                                : ""
                                        }
                                        error={
                                            errors.passwordConfirm &&
                                            touched.passwordConfirm
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        label="About"
                                        name="about"
                                        multiline
                                        rows={2}
                                        value={values.about}
                                        helperText={
                                            errors.about && touched.about
                                                ? errors.about
                                                : ""
                                        }
                                        error={
                                            errors.about && touched.about
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></TextField>
                                    {/* <Field
                                        name="active"
                                        label="Status"
                                        component={FormikRadioGroup}
                                        options={statusOptions}
                                    /> */}
                                    <FormControl>
                                        <FormLabel>Status</FormLabel>
                                        <MyRadio
                                            name="active"
                                            type="radio"
                                            value="true"
                                            label="Active"
                                        />
                                        <MyRadio
                                            name="active"
                                            type="radio"
                                            value="false"
                                            label="In Active"
                                        />
                                    </FormControl>
                                    {/* <TextField
                                        variant="outlined"
                                        label="Rating"
                                        name="rating"
                                        value={values.rating}
                                        helperText={
                                            errors.rating && touched.rating
                                                ? errors.rating
                                                : ""
                                        }
                                        error={
                                            errors.rating && touched.rating
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></TextField> */}
                                    <FormControl>
                                        <FormLabel>User Type</FormLabel>
                                        <MyRadio
                                            name="usertype"
                                            type="radio"
                                            value="Household"
                                            label="Household"
                                            checked="true"
                                        />
                                        <MyRadio
                                            name="usertype"
                                            type="radio"
                                            value="Junkshop"
                                            label="Junkshop"
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Verified</FormLabel>
                                        <MyRadio
                                            name="verified"
                                            type="radio"
                                            value="false"
                                            label="Not Verified"
                                        />
                                        <MyRadio
                                            name="verified"
                                            type="radio"
                                            value="true"
                                            label="Verified"
                                        />
                                    </FormControl>
                                    {/* <TextField
                                        variant="outlined"
                                        label="Stat1"
                                        name="stat1"
                                        value={values.stat1}
                                        helperText={
                                            errors.stat1 && touched.stat1
                                                ? errors.stat1
                                                : ""
                                        }
                                        error={
                                            errors.stat1 && touched.stat1
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></TextField>
                                    <TextField
                                        variant="outlined"
                                        label="Stat2"
                                        name="stat2"
                                        value={values.stat2}
                                        helperText={
                                            errors.stat2 && touched.stat2
                                                ? errors.stat2
                                                : ""
                                        }
                                        error={
                                            errors.stat2 && touched.stat2
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></TextField> */}

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
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                history.goBack();
                                            }}
                                            variant="contained"
                                            color="default"
                                            className={classes.button}
                                        >
                                            Cancel
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

export default AddUser;
