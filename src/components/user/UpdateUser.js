import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    makeStyles,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
    projectAuth,
    projectFirestore,
    projectStorage,
} from "../../config/firebase";
import { useHistory } from "react-router-dom";

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

const updateUserSchema = Yup.object().shape({
    email: Yup.string()
        .email("Must be a valid email!")
        .notOneOf(takenEmailAddresses, "Email already taken")
        .required("Required"),
    // name: Yup.string().min(2, "To short!").required("Required"),
    // password: Yup.string()
    //     .min(6, "Password must be atleast 6 characters!")
    //     .required("Required"),
    // passwordConfirm: Yup.string()
    //     .oneOf([Yup.ref("password")], "Password must be the same!")
    //     .min(6, "Password must be atleast 6 characters!")
    //     .required("Required"),
    // about: Yup.string().required("Required"),
    // active: Yup.string().required("Required"),
    // rating: Yup.string().required("Required"),
    // stat1: Yup.string().required("Required"),
    // stat2: Yup.string().required("Required"),
});

const statusOptions = [
    { label: "Active", value: "true" },
    { label: "In Active", value: "false" },
];

// const MyRadio = ({ label, checked, ...props }) => {
//     const [field] = useField(props);
//     return (
//         <FormControlLabel
//             {...field}
//             control={<Radio color="primary" />}
//             label={label}
//             checked={checked}
//         />
//     );
// };

const convertToBoolean = (value) => {
    if (value == "true") {
        return true;
    } else {
        return false;
    }
};

const UpdateUser = ({ match }) => {
    const classes = useStyle();
    const history = useHistory();
    const [profileImage, setProfileImage] = useState("/no-profile.jpg");
    // const [user, setUser] = useState({});
    const id = match.params.id;
    const { handleSubmit, control, setValue, register, errors } = useForm({
        resolver: yupResolver(updateUserSchema),
    });
    const getDataFromFirestore = () => {
        // projectFirestore
        //     .collection("users")
        //     .doc(id)
        //     .get()
        //     .then((doc) => {
        //         if (doc.exists) {
        //             setUser(doc.data());
        //         }
        //     });
        setValue("email", "test.com");
    };

    useEffect(() => {
        getDataFromFirestore();
    }, []);

    const onSubmit = (data, event) => {
        event.preventDefault();
        console.log(data, "test");
    };

    return (
        <Paper className={classes.pageContent}>
            <form
                className={classes.root}
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                {" "}
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
                                <Button variant="contained" component="label">
                                    Upload Image
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        id="profilePicture"
                                        style={{ display: "none" }}
                                        onChange={(event) => {
                                            //set values file to current selected image
                                            // setFieldValue(
                                            //     "avatar",
                                            //     event.currentTarget.files[0]
                                            // );
                                            // preview image before uploading
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                if (reader.readyState === 2) {
                                                    setProfileImage(
                                                        reader.result
                                                    );
                                                }
                                            };
                                            reader.readAsDataURL(
                                                event.target.files[0]
                                            );
                                        }}
                                    />
                                </Button>
                            </div>
                        </div>
                        {/* <TextField
                            shrink
                            id="email"
                            variant="outlined"
                            label="Email"
                            name="email"
                            inputRef={register}

                            // helperText={
                            //     errors.email && touched.email
                            //         ? errors.email
                            //         : ""
                            // }
                            // error={errors.email && touched.email ? true : false}
                        ></TextField> */}
                        <Controller
                            as={
                                <TextField
                                    variant="outlined"
                                    label="Email"
                                    helperText={
                                        errors.email ? errors.email.message : ""
                                    }
                                    error={errors.email ? true : false}
                                />
                            }
                            control={control}
                            name="email"
                            defaultValue=""
                        />

                        <TextField
                            variant="outlined"
                            label="Full Name"
                            name="name"
                            // helperText={
                            //     errors.name && touched.name ? errors.name : ""
                            // }
                            // error={errors.name && touched.name ? true : false}
                        ></TextField>
                        <TextField
                            variant="outlined"
                            label="Password"
                            name="password"
                            type="password"
                            // helperText={
                            //     errors.password && touched.password
                            //         ? errors.password
                            //         : ""
                            // }
                            // error={
                            //     errors.password && touched.password
                            //         ? true
                            //         : false
                            // }
                        ></TextField>
                        <TextField
                            variant="outlined"
                            label="Confirm Password"
                            name="passwordConfirm"
                            type="password"
                            // helperText={
                            //     errors.passwordConfirm &&
                            //     touched.passwordConfirm
                            //         ? errors.passwordConfirm
                            //         : ""
                            // }
                            // error={
                            //     errors.passwordConfirm &&
                            //     touched.passwordConfirm
                            //         ? true
                            //         : false
                            // }
                        ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            label="About"
                            name="about"
                            multiline
                            rows={2}
                            // helperText={
                            //     errors.about && touched.about
                            //         ? errors.about
                            //         : ""
                            // }
                            // error={errors.about && touched.about ? true : false}
                        ></TextField>
                        {/* <Field
                                        name="active"
                                        label="Status"
                                        component={FormikRadioGroup}
                                        options={statusOptions}
                                    /> */}
                        {/* <Select
                            // onChange={handleChange("active")}
                            inputProps={{
                                name: "active",
                            }}
                        >
                            <MenuItem value="true">Active</MenuItem>
                            <MenuItem value="false">In Active</MenuItem>
                        </Select> */}
                        {/* <FormControl component="fieldset">
                                        <FormLabel component="legend">
                                            Status
                                        </FormLabel>
                                        <RadioGroup
                                            aria-label="gender"
                                            name="active"
                                            value={values.active}
                                            onChange={handleChange}
                                            defaultValue="true"
                                        >
                                            <FormControlLabel
                                                value="true"
                                                control={<Radio />}
                                                label="Active"
                                            />
                                            <FormControlLabel
                                                value="false"
                                                control={<Radio />}
                                                label="In Active"
                                            />
                                        </RadioGroup>
                                    </FormControl> */}
                        {/* <FormControl>
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
                        </FormControl> */}
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
                        {/* <FormControl>
                            <FormLabel>User Type</FormLabel>
                            <MyRadio
                                name="usertype"
                                type="radio"
                                value="Household"
                                label="Household"
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
                                // checked={
                                //     values.verified ? "" : "checked"
                                // }
                                label="Not Verified"
                            />
                            <MyRadio
                                name="verified"
                                type="radio"
                                value="true"
                                // checked={
                                //     values.verified ? "checked" : ""
                                // }
                                label="Verified"
                            />
                        </FormControl> */}
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
            </form>
        </Paper>
    );
};

export default UpdateUser;
