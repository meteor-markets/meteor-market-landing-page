import React, { useState } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  OutlinedInput,
  makeStyles,
  IconButton,
  InputAdornment,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as yep from "yup";
import { useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "23px",
    paddingBottom: "30px",
    "& h5 ": {
      marginTop: "10px",
    },
  },
  container: {
    marginTop: "3rem",
    backgroundColor: "#253d2f ",
    border: "1px solid White",
    padding: "25px 40px",
    borderRadius: "15px",
    "& h5": {
      color: "#fff",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "25px 15px",
    },
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
      // borderRadius: "50%",
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
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [_isloading, setLoading] = useState(false);
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const formValidationSchema = yep.object().shape({
    password: yep
      .string()
      .required("Password is required.")
      .matches(passwordRegex, "Password must be valid"),
    newPassword: yep
      .string()
      .required("New password is required.")
      .matches(
        passwordRegex,
        "Password should contain atleast one number and one special character."
      ),
    confirmPassword: yep
      .string()
      .required("Confirmation of your password is required.")
      .oneOf([yep.ref("newPassword"), null], "Passwords must match"),
  });
  const formInitialSchema = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  const ChangePassword = async (values) => {
    // console.log("disfaiuerhuiq--->", values);
    const formdata = {
      oldPassword: values.password,
      newPassword: values.newPassword,
    };
    try {
      setLoading(true);
      const res = await axios({
        url: apiConfig.changePassword,
        method: "PUT",
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
        data: formdata,
      });
      if (res?.data?.responseCode === 200) {
        setLoading(false);
        toast.success(res?.data?.responseMessage);
        history.push("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.responseMessage);
      console.log("error--->>>", error);
    }
  };
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.LineBtn}>
        <Typography variant="h1">Change Password</Typography>
      </Box>
      <Divider className={classes.divider} />

      <Container maxWidth="md">
        <Box className={classes.container}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Formik
                initialValues={formInitialSchema}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={formValidationSchema}
                onSubmit={ChangePassword}
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
                    <Grid
                      container
                      spacing={1}
                      display="flex"
                      // alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item lg={3} md={4} sm={5} xs={12}>
                        <Typography variant="h5">
                          Old Password &nbsp;:
                        </Typography>
                      </Grid>
                      <Grid item lg={7} md={6} sm={7} xs={12}>
                        <Box>
                          <OutlinedInput
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            placeholder="Current Password"
                            name="password"
                            value={values.password}
                            error={Boolean(touched.password && errors.password)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{ height: "45px", marginTop: "8px" }}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowPassword(!showPassword)}
                                  // onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <Visibility
                                      style={{
                                        color: "White",
                                        fontSize: "18px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    />
                                  ) : (
                                    <VisibilityOff
                                      style={{
                                        color: "White",
                                        fontSize: "18px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <FormHelperText error>
                            {touched.password && errors.password}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={3} md={4} sm={5} xs={12}>
                        <Typography variant="h5">
                          New Password&nbsp;:
                        </Typography>
                      </Grid>
                      <Grid item lg={7} md={6} sm={7} xs={12}>
                        <Box>
                          <OutlinedInput
                            type={newPassword ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            placeholder="New Password"
                            name="newPassword"
                            value={values.newPassword}
                            error={Boolean(
                              touched.newPassword && errors.newPassword
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{ height: "45px", marginTop: "8px" }}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setNewPassword(!newPassword)}
                                  // onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {newPassword ? (
                                    <Visibility
                                      style={{
                                        color: "White",
                                        fontSize: "18px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    />
                                  ) : (
                                    <VisibilityOff
                                      style={{
                                        color: "White",
                                        fontSize: "18px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <FormHelperText error>
                            {touched.newPassword && errors.newPassword && (
                              <ul
                                style={{
                                  padding: "0px 0px 0px 19px",
                                  marginLeft: "-15px",
                                  listStyleType: "none",
                                  marginTop: "3px",
                                }}
                              >
                                <li>Must be at least 8 Characters long</li>
                                <li>Must be atleast One Uppercase letter</li>
                                <li> Must be atleast One Lowercase letter</li>
                                <li> Must be at least One digit</li>
                                <li>
                                  Must be at least one special case Character
                                </li>
                              </ul>
                            )}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item lg={3} md={4} sm={5} xs={12}>
                        <Typography variant="h5">
                          Confirm Password&nbsp;:
                        </Typography>
                      </Grid>
                      <Grid item lg={7} md={6} sm={7} xs={12}>
                        <Box>
                          <OutlinedInput
                            type={showPasswordConfirm ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            error={Boolean(
                              touched.confirmPassword && errors.confirmPassword
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            style={{ height: "45px", marginTop: "8px" }}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() =>
                                    setShowPasswordConfirm(!showPasswordConfirm)
                                  }
                                  // onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPasswordConfirm ? (
                                    <Visibility
                                      style={{
                                        color: "White",
                                        fontSize: "18px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    />
                                  ) : (
                                    <VisibilityOff
                                      style={{
                                        color: "White",
                                        fontSize: "18px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <FormHelperText error>
                            {touched.confirmPassword && errors.confirmPassword}
                          </FormHelperText>
                        </Box>
                      </Grid>
                    </Grid>
                    <Box mt={4} align="center">
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
                        <CircularProgress
                          style={{ color: "#fff" }}
                          disableShrink
                        />
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Update
                        </Button>
                      )}
                    </Box>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
export default Viewuser;
