import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
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
    padding: "25px 40px",
    borderRadius: "15px",
    "& h5": {
      color: "#fff !important",
    },
    "& h6": {
      color: "#fff !important",
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
      objectFit: "cover",
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
}));

function Viewuser() {
  const classes = useStyles();
  const history = useHistory();
  const [userDetails, setUserDetails] = useState("");

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
        setUserDetails(res.data.result);
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
      <Typography variant="h1">View Profile</Typography>

      <Divider className={classes.divider} />

      <Container maxWidth="md">
        <Box className={classes.container}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <figure className={classes.upload}>
                <img src="/images/profilePlaceholder.jpeg" alt="" />
              </figure>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
            <Grid item xs={12} sm={9} md={9} lg={9}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Typography variant="h5">Name &nbsp;:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography variant="h6" style={{ wordBreak: "Break-all" }}>
                    {userDetails?.name}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Typography variant="h5">Email&nbsp;:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography variant="h6">{userDetails?.email}</Typography>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Typography variant="h5">Mobile Number&nbsp;:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  {userDetails && (
                    <Typography variant="h6">
                      +{userDetails?.countryCode}&nbsp;
                      {userDetails?.mobileNumber}
                    </Typography>
                  )}
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Typography variant="h5">Address&nbsp;:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography variant="h6">
                    {userDetails?.address ? userDetails?.address : "--"}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Typography variant="h5">City&nbsp;:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography variant="h6">
                    {userDetails?.city ? userDetails?.city : "--"}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Typography variant="h5">State&nbsp;:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography variant="h6">
                    {userDetails?.state ? userDetails?.state : "--"}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Typography variant="h5">Country&nbsp;:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography variant="h6">
                    {userDetails?.country ? userDetails?.country : "--"}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Typography variant="h5">User Type&nbsp;:</Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography variant="h6">
                    {userDetails?.userType ? userDetails?.userType : "--"}
                  </Typography>
                </Grid>
              </Grid>
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
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
export default Viewuser;
