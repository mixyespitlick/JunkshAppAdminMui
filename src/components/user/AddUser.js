import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
    projectAuth,
    projectFirestore,
    projectStorage,
} from "../../config/firebase";

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

const addUserSchema = Yup.object().shape({
    email: Yup.string()
        .email("Must be a valid email!")
        .notOneOf(takenEmailAddresses, "Email already taken")
        .required("Required"),
    fullname: Yup.string()
        .matches(/^([^0-9]*)$/, "Full Name should not contain numbers")
        .required("Required")
        .min(2, "To short!"),
    password: Yup.string()
        .required("Required")
        .min(6, "Password must be atleast 6 characters!"),
    passwordConfirm: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password")], "Password must be the same!")
        .min(6, "Password must be atleast 6 characters!"),
    about: Yup.string().required("Required"),
    usertype: Yup.string().required("Required"),
    // status: Yup.string().required("Required"),
    // rating: Yup.string().required("Required"),
    // stat1: Yup.string().required("Required"),
    // stat2: Yup.string().required("Required"),
});

const AddUser = () => {
    const classes = useStyle();
    const [profileImage, setProfileImage] = useState("/no-profile.jpg");
    const history = useHistory();
    const { handleSubmit, control, setValue, register, errors } = useForm({
        resolver: yupResolver(addUserSchema),
    });

    const onSubmit = (data) => {
        const {
            fullname,
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
        } = data;

        projectAuth
            .createUserWithEmailAndPassword(email, password)
            .then((cred) => {
                // create new user
                return new Promise((resolve, reject) => {
                    let userID = cred.user.uid;
                    projectFirestore.collection("users").doc(userID).set({
                        name: fullname,
                        email: email,
                        avatar: "",
                        id: userID,
                        about: "",
                        uploadedfile: "",
                        verified: false,
                        active: true,
                        stat1: 8,
                        stat2: 0,
                        rating: 5,
                        timestamp: "",
                        usertype: usertype,
                    });
                    resolve(userID);
                });
            })
            .then((userID) => {
                // this will run if rules on storage:
                // allow read, write: if true
                // allow read, write: if request.time < timestamp.date(2020, 12, 31);
                return projectStorage
                    .ref(`avatars/${userID}`)
                    .put(avatar[0])
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
                                        .set({ avatar: url }, { merge: true });
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
    };

    return (
        <Paper className={classes.pageContent}>
            <form
                className={classes.root}
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
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
                                <Button variant="contained" component="label">
                                    Upload Image
                                    <input
                                        type="file"
                                        ref={register}
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
                        <TextField
                            variant="outlined"
                            label="Email"
                            name="email"
                            inputRef={register}
                            helperText={
                                errors.email ? errors.email.message : ""
                            }
                            error={errors.email ? true : false}
                        ></TextField>

                        <TextField
                            variant="outlined"
                            label="Full Name"
                            name="fullname"
                            inputRef={register}
                            helperText={
                                errors.fullname ? errors.fullname.message : ""
                            }
                            error={errors.fullname ? true : false}
                        ></TextField>
                        <TextField
                            variant="outlined"
                            label="Password"
                            name="password"
                            type="password"
                            inputRef={register}
                            helperText={
                                errors.password ? errors.password.message : ""
                            }
                            error={errors.password ? true : false}
                        ></TextField>
                        <TextField
                            variant="outlined"
                            label="Confirm Password"
                            name="passwordConfirm"
                            type="password"
                            inputRef={register}
                            helperText={
                                errors.passwordConfirm
                                    ? errors.passwordConfirm.message
                                    : ""
                            }
                            error={errors.passwordConfirm ? true : false}
                        ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            label="About"
                            name="about"
                            inputRef={register}
                            helperText={
                                errors.about ? errors.about.message : ""
                            }
                            error={errors.about ? true : false}
                        ></TextField>
                        <FormControl
                            component="fieldset"
                            error={Boolean(errors.usertype)}
                        >
                            <FormLabel component="legend">User Type</FormLabel>
                            <Controller
                                id="usertype"
                                control={control}
                                name="usertype"
                                defaultValue=""
                                as={
                                    <Select label="User Type">
                                        <MenuItem value="Household">
                                            Household
                                        </MenuItem>
                                        <MenuItem value="Junkshop">
                                            Junkshop
                                        </MenuItem>
                                    </Select>
                                }
                            />
                            <FormHelperText>
                                {errors.usertype && errors.usertype.message}
                            </FormHelperText>
                        </FormControl>

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

export default AddUser;
