import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  makeStyles,
  FormHelperText,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import * as yep from "yup";
import { toast } from "react-toastify";
import Divider from "@material-ui/core/Divider";
import { Form, Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "23px",
    paddingBottom: "30px",
    "& h2 ": {},
  },
  container: {
    marginTop: "3rem",
    backgroundColor: "#253d2f ",
    border: "1px solid White",
    padding: "35px 40px 40px",
    borderRadius: "15px",
  },
  upload: {
    width: "150px",
    height: "150px",
    margin: "16px 0",
    cursor: "pointer",
    borderRadius: "20px",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      border: "1px solid White",
      objectFit: "cover",
    },
    "& button": {
      position: "absolute",
      border: "3px solid black",
      bottom: 0,
      right: 0,
      backgroundColor: "#fff",
      color: "#000",
      fontSize: "15px",
      "&:hover": {
        backgroundColor: "#fff",
        border: "3px solid black",
      },
      "& input": {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        opacity: 0,
      },
    },
  },
  btn: {
    textAlign: "center",
    paddingTop: "20px",
  },
  divider: {
    marginTop: "10px",
    backgroundColor: "White",
  },
  walletcopy: {
    "& h6": {
      wordBreak: "break-word",
    },
  },
  LineBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
}));

function Viewuser() {
  const classes = useStyles();
  const history = useHistory();
  const [countryCode, setCountryCode] = useState("");
  const [_isloading, setLoading] = useState(false);
  const userNameRegex =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;

  const formInitialValue = {
    userName: "",
    phoneNo: "",
    address: "",
    city: "",
    state: "",
    country: "",
  };
  const formValidationSchema = yep.object().shape({
    userName: yep
      .string()
      .required(" Name is required.")
      .min(2, "Please enter at least 2 characters")
      .max(35, "You can enter only 35 characters")
      .matches(
        userNameRegex,
        "Only alphabets and white spaces are allowed for this field number are not. "
      ),
    phoneNo: yep.string().required(" Phone is required."),

    address: yep
      .string()
      .required("Address is required.")
      .min(2, "Please enter at least 2 characters"),
    city: yep
      .string()
      .required("Address is required.")
      .min(2, "Please enter at least 2 characters"),
    state: yep
      .string()
      .required("Address is required.")
      .min(2, "Please enter at least 2 characters"),
    country: yep
      .string()
      .required("Address is required.")
      .min(2, "Please enter at least 2 characters"),
  });

  const [_prefield, setPreField] = useState(formInitialValue);
  const EditProfile = async (values) => {
    setLoading(true);
    const formdata = {
      name: values.userName,
      mobileNumber: values.phoneNo?.slice(countryCode?.length)?.toString(),
      address: values.address,
      city: values.city,
      state: values.state,
      country: values.country,
      countryCode: countryCode,
    };
    try {
      const res = await axios({
        url: apiConfig.editProfile,
        method: "PUT",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: formdata,
      });
      if (res?.data?.responseCode === 200) {
        setLoading(false);
        toast.success(res?.data?.responseMessage);
        history.push("./view-profile");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.responseMessage);
      console.log("error--->>>", error);
    }
  };

  const ViewProfileFunction = async () => {
    try {
      const res = await axios({
        url: apiConfig.viewProfile,
        method: "GET",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res?.data?.responseCode === 200) {
        const formInitialValue = {
          userName: res?.data?.result?.name,
          address: res?.data?.result?.address,
          city: res?.data?.result?.city,
          state: res?.data?.result?.state,
          country: res?.data?.result?.country,
          phoneNo:
            res?.data?.result?.countryCode + res?.data?.result?.mobileNumber,
        };
        setPreField(formInitialValue);
      }
    } catch (error) {
      console.log("error --->>", error);
    }
  };
  useEffect(() => {
    ViewProfileFunction();
  }, []);
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.LineBtn}>
        <Typography variant="h1">Edit Profile</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push({
              pathname: "/changePassword",
              // search:"Add",
            });
          }}
        >
          Change Password
        </Button>
      </Box>
      <Divider className={classes.divider} />

      <Container maxWidth="md">
        <Box className={classes.container}>
          <Formik
            initialValues={_prefield}
            enableReinitialize={true}
            initialStatus={{
              success: false,
              successMsg: "",
            }}
            validationSchema={formValidationSchema}
            onSubmit={EditProfile}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  ></Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box>
                      <Typography
                        variant="h5"
                        color="primary"
                        style={{
                          paddingBottom: "8px",
                          color: "#fff",
                        }}
                      >
                        User Name :
                      </Typography>
                      <Box>
                        <TextField
                          variant="outlined"
                          name="userName"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.userName}
                          error={Boolean(touched.userName && errors.userName)}
                          placeholder="Please enter user name"
                          className={classes.textField}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.userName && errors.userName}
                        </FormHelperText>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box>
                      <Typography
                        variant="h5"
                        color="primary"
                        style={{
                          paddingBottom: "8px",
                          color: "#fff",
                        }}
                      >
                        Mobile Number :
                      </Typography>
                      <Box>
                        <PhoneInput
                          country={"in"}
                          name="phoneNo"
                          inputStyle={{
                            background: "transparent",
                            width: "100%",
                            color: "#fff",
                            height: "43px",
                            borderRadius: "5px",
                          }}
                          value={values.phoneNo}
                          error={Boolean(touched.phoneNo && errors.phoneNo)}
                          onBlur={handleBlur}
                          onChange={(phone, e) => {
                            setCountryCode(e.dialCode);
                            setFieldValue("phoneNo", phone);
                          }}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.phoneNo && errors.phoneNo}
                        </FormHelperText>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box>
                      <Typography
                        variant="h5"
                        color="primary"
                        style={{
                          paddingBottom: "8px",
                          color: "#fff",
                        }}
                      >
                        Address :
                      </Typography>
                      <Box>
                        <TextField
                          variant="outlined"
                          name="address"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address}
                          error={Boolean(touched.address && errors.address)}
                          placeholder="Please enter address"
                          className={classes.textField}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.address && errors.address}
                        </FormHelperText>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box>
                      <Typography
                        variant="h5"
                        color="primary"
                        style={{
                          paddingBottom: "8px",
                          color: "#fff",
                        }}
                      >
                        City :
                      </Typography>
                      <Box>
                        <TextField
                          variant="outlined"
                          name="city"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.city}
                          error={Boolean(touched.city && errors.city)}
                          placeholder="Please enter city name"
                          className={classes.textField}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.city && errors.city}
                        </FormHelperText>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box>
                      <Typography
                        variant="h5"
                        color="primary"
                        style={{
                          paddingBottom: "8px",
                          color: "#fff",
                        }}
                      >
                        State :
                      </Typography>
                      <Box>
                        <TextField
                          variant="outlined"
                          name="state"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.state}
                          error={Boolean(touched.state && errors.state)}
                          placeholder="Please enter state name"
                          className={classes.textField}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.state && errors.state}
                        </FormHelperText>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box>
                      <Typography
                        variant="h5"
                        color="primary"
                        style={{
                          paddingBottom: "8px",
                          color: "#fff",
                        }}
                      >
                        Country :
                      </Typography>
                      <Box>
                        <TextField
                          variant="outlined"
                          name="country"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.country}
                          error={Boolean(touched.country && errors.country)}
                          placeholder="Please enter country name"
                          className={classes.textField}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.country && errors.country}
                        </FormHelperText>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  mt={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      history.push("/dashboard");
                    }}
                  >
                    Back
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  {_isloading && _isloading === true ? (
                    <CircularProgress style={{ color: "#fff" }} disableShrink />
                  ) : (
                    <Button variant="contained" color="primary" type="submit">
                      Update
                    </Button>
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
}
export default Viewuser;
