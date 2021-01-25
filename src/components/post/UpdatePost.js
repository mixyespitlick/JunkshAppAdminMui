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

const updatePostSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
});

const UpdatePost = () => {
    const classes = useStyle();
    const [image1, setImage1] = useState("/no-profile.jpg");
    const [image2, setImage2] = useState("/no-profile.jpg");
    const [image3, setImage3] = useState("/no-profile.jpg");
    const history = useHistory();
    const { handleSubmit, control, setValue, register, errors } = useForm({
        resolver: yupResolver(updatePostSchema),
    });

    const onSubmit = (data) => {
        // const {
        //     image1,
        //     image2,
        //     image3,
        //     title,
        //     category,
        //     description,
        //     askingprice,
        //     location,
        // } = data;
        console.log(data);
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
                                    <FormLabel>Image 1</FormLabel>
                                </div>
                                <img src={image1} className="profile-image" />
                                <Button variant="contained" component="label">
                                    Upload Image
                                    <input
                                        type="file"
                                        ref={register}
                                        name="image1"
                                        accept="image/*"
                                        id="image1"
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
                                                    setImage1(reader.result);
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
                        <div className={classes.profile}>
                            <div className="image-wrapper">
                                <div>
                                    <FormLabel>Image 2</FormLabel>
                                </div>
                                <img src={image2} className="profile-image" />
                                <Button variant="contained" component="label">
                                    Upload Image
                                    <input
                                        type="file"
                                        ref={register}
                                        name="image2"
                                        accept="image/*"
                                        id="image2"
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
                                                    setImage2(reader.result);
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
                        <div className={classes.profile}>
                            <div className="image-wrapper">
                                <div>
                                    <FormLabel>Image 3</FormLabel>
                                </div>
                                <img src={image3} className="profile-image" />
                                <Button variant="contained" component="label">
                                    Upload Image
                                    <input
                                        type="file"
                                        ref={register}
                                        name="image3"
                                        accept="image/*"
                                        id="image3"
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
                                                    setImage3(reader.result);
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
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            label="Title"
                            name="title"
                            inputRef={register}
                            helperText={
                                errors.title ? errors.title.message : ""
                            }
                            error={errors.title ? true : false}
                        ></TextField>

                        <FormControl
                            component="fieldset"
                            error={Boolean(errors.category)}
                        >
                            <FormLabel component="legend">Category</FormLabel>
                            <Controller
                                id="category"
                                control={control}
                                name="category"
                                defaultValue=""
                                as={
                                    <Select label="Select Category">
                                        <MenuItem value="Bakal">Bakal</MenuItem>
                                        <MenuItem value="Bote">Bote</MenuItem>
                                        <MenuItem value="Plastic">
                                            Plastic
                                        </MenuItem>
                                        <MenuItem value="Appliances">
                                            Appliances
                                        </MenuItem>
                                        <MenuItem value="Assorted">
                                            Assorted
                                        </MenuItem>
                                    </Select>
                                }
                            />
                            <FormHelperText>
                                {errors.usertype && errors.usertype.message}
                            </FormHelperText>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            label="Description"
                            name="description"
                            inputRef={register}
                            helperText={
                                errors.description
                                    ? errors.description.message
                                    : ""
                            }
                            error={errors.description ? true : false}
                        ></TextField>
                        <TextField
                            variant="outlined"
                            label="Asking Price"
                            name="askingprice"
                            inputRef={register}
                            helperText={
                                errors.askingprice
                                    ? errors.askingprice.message
                                    : ""
                            }
                            error={errors.askingprice ? true : false}
                        ></TextField>
                        <TextField
                            variant="outlined"
                            label="Location"
                            name="location"
                            inputRef={register}
                            helperText={
                                errors.location ? errors.location.message : ""
                            }
                            error={errors.location ? true : false}
                        ></TextField>

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

export default UpdatePost;
