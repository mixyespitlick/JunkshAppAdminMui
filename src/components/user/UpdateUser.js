import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
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
    fullname: Yup.string().min(2, "To short!").required("Required"),
    // password: Yup.string()
    //     .min(6, "Password must be atleast 6 characters!")
    //     .required("Required"),
    // passwordConfirm: Yup.string()
    //     .oneOf([Yup.ref("password")], "Password must be the same!")
    //     .min(6, "Password must be atleast 6 characters!")
    //     .required("Required"),
    // about: Yup.string().required("Required"),
    // status: Yup.string().required("Required"),
    // rating: Yup.string().required("Required"),
    // stat1: Yup.string().required("Required"),
    // stat2: Yup.string().required("Required"),
});

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
    const id = match.params.id;
    const { handleSubmit, control, setValue, register, errors } = useForm({
        resolver: yupResolver(updateUserSchema),
    });
    const getDataFromFirestore = () => {
        projectFirestore
            .collection("users")
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    let user = doc.data();
                    console.log(user);
                    setProfileImage(user.avatar);
                    setValue("email", user.email);
                    setValue("fullname", user.name);
                    setValue("about", user.about ? "none" : "None");
                    setValue("active", user.active ? "active" : "inactive");
                    setValue("usertype", user.usertype);
                    setValue(
                        "verified",
                        user.verified ? "verified" : "notverified"
                    );
                }
            });
    };

    useEffect(() => {
        getDataFromFirestore();
    }, []);

    const onSubmit = (data, event) => {
        //mao ni ang mu gana
        //covertion form string to boolean
        // console.log(data.active == "active" ? true : false);
        // console.log(data.verified == "verified" ? true : false);
        projectFirestore
            .collection("users")
            .doc(id)
            .update({
                active: data.active == "active" ? true : false,
                verified: data.verified == "verified" ? true : false,
            });
        history.goBack();
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
                        <Controller
                            as={
                                <TextField
                                    variant="outlined"
                                    label="Fullname"
                                    helperText={
                                        errors.fullname
                                            ? errors.fullname.message
                                            : ""
                                    }
                                    error={errors.fullname ? true : false}
                                />
                            }
                            control={control}
                            name="fullname"
                            defaultValue=""
                        />

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
                        <Controller
                            as={
                                <TextField
                                    variant="outlined"
                                    label="About"
                                    helperText={
                                        errors.about ? errors.about.message : ""
                                    }
                                    error={errors.about ? true : false}
                                />
                            }
                            control={control}
                            name="about"
                            defaultValue=""
                        />
                        <FormControl
                            component="fieldset"
                            error={Boolean(errors.active)}
                        >
                            <FormLabel component="legend">Status</FormLabel>
                            <Controller
                                control={control}
                                name="active"
                                defaultValue=""
                                as={
                                    <Select label="Status">
                                        <MenuItem value="active">
                                            Active
                                        </MenuItem>
                                        <MenuItem value="inactive">
                                            In Active
                                        </MenuItem>
                                    </Select>
                                }
                            />
                            <FormHelperText>
                                {errors.active && errors.active.message}
                            </FormHelperText>
                        </FormControl>
                        <FormControl
                            component="fieldset"
                            error={Boolean(errors.usertype)}
                        >
                            <FormLabel component="legend">User Type</FormLabel>
                            <Controller
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
                        <FormControl
                            component="fieldset"
                            error={Boolean(errors.verified)}
                        >
                            <FormLabel component="legend">Verified</FormLabel>
                            <Controller
                                control={control}
                                name="verified"
                                defaultValue=""
                                as={
                                    <Select label="Verified">
                                        <MenuItem value="verified">
                                            Verified
                                        </MenuItem>
                                        <MenuItem value="notverified">
                                            Not Verified
                                        </MenuItem>
                                    </Select>
                                }
                            />
                            <FormHelperText>
                                {errors.verified && errors.verified.message}
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

export default UpdateUser;
