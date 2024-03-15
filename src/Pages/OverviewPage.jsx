import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "../Component/Page";
import Footer from "../HomeLayout/Footer";
import { FetchOverview } from "../APIconfig/ApiEndPoint";
import { useDispatch, useSelector } from "react-redux";
import ApexChart from "./ApexChart";
import LineGraph from "./LineGraph";
import { addOverviewDetails } from "../Store/walletSlice";

const useStyles = makeStyles((theme) => ({
  headBox: {
    padding: "23px 30px",
    borderRadius: "9px",
    background: "#1C1C1C",
    "& h3": {
      color: "black",
      marginBottom: "15px",
    },
  },
  mainbox: {
    background: "rgb(176 176 176 / 10%) !important",
    padding: "20px",
    borderRadius: "9px",
    height: "85px",
    // boxShadow: "2px 1px 5px black",
    cursor: "pointer",

    transition: "0.3s",
    "& h4": {
      textAlign: "center",
      justifyContent: "center",
      color: "black",
    },

    "& h2": {
      textAlign: "center",
      marginTop: "10px",
      color: "black",
    },
    "&:hover": {
      transform: "translateY(-10px)",
    },
  },
  divider: {
    marginTop: "10px",
    backgroundColor: "White",
  },

  lokedIconBox: {
    width: "50px",
    height: "50px",
    backgroundColor: "rgb(176 176 176 / 20%)",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10px",
  },
  analyticsBox:{
    marginTop:"20px"
  }
}));

 const OverviewPage=()=> {
  const dispatch = useDispatch()

  const classes = useStyles();
  const getUserOverViewData = useSelector(state => state.walletDeatils.getUserOverView);
  let token = sessionStorage?.getItem("token")
  useEffect(()=>{
if (token) {
  getOverview(token)
}

  },[token])
  const getOverview = async (token) => {
    
    const response = await FetchOverview(token)
    if (response?.responseCode === 200) {
      dispatch(addOverviewDetails(response.result[0]))
    }
  }

  return (
    <Page title="Overview">
      <Box className={classes.headBox}>
        <Grid container spacing={3} style={{ marginTop: "30px" }}>
          <Grid item lg={3}>
            <Box display={"flex"} alignItems={"center"}>
              <Box className={classes.lokedIconBox}>
                <img
                  alt=""
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                  width="100%"
                  src={"../images/moneys-1.png"}
                />
              </Box>
              <Box>
                <Typography variant="h4" className="textColorFormate">
                  Total Assets
                </Typography>
                <Typography variant="h2" className="textColorFormate">
                  $ {getUserOverViewData?.totalAssets}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={3}>
            <Box display={"flex"} alignItems={"center"}>
              <Box className={classes.lokedIconBox}>
                <img
                  alt=""
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                  width="100%"
                  src={"../images/moneys-1.png"}
                />
              </Box>
              <Box>
                <Typography variant="h4" className="textColorFormate">
                  Total Supply
                </Typography>
                <Typography variant="h2" className="textColorFormate">
                  $ {getUserOverViewData?.totalSupply}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={3}>
            <Box display={"flex"} alignItems={"center"}>
              <Box className={classes.lokedIconBox}>
                <img
                  alt=""
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                  width="100%"
                  src={"../images/moneys-1.png"}
                />
              </Box>
              <Box>
                <Typography variant="h4" className="textColorFormate">
                  Total Borrow
                </Typography>
                <Typography variant="h2" className="textColorFormate">
                  $ {getUserOverViewData?.totalBorrow}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box className={classes.analyticsBox}>
          {/*
          <img
          alt=""
          style={{
            objectFit: "cover",
          }}
          width="100%"
          src={"../images/group-anlytics.png"}
        />
        */}
          <ApexChart/>
          {/*
          <LineGraph/>
        */}
        </Box>
      </Box>

      <Footer />
    </Page>
  );
}

export default OverviewPage
