import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, makeStyles, Divider,Icon } from "@material-ui/core";
import Page from "src/component/Page";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import { useHistory } from "react-router-dom";
import { FaUser } from "react-icons/fa";

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
}));

export default function Index() {
  const classes = useStyles();
  const history = useHistory();

  const [getDashboardData, setDashboardData] = useState([]);
  console.log("sdokejufasfkhjluer-->", getDashboardData);

  const dashboardData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: apiConfig.dashBoard,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res) {
        setDashboardData(res?.data?.result);
        // console.log("fdsfgagfaggyfae", res?.data?.result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const dashboard = [
    {
      heading: "Total Assets",
      subheading: "$ 87.743",
      icon: FaUser,
      // href: "/all-users",
    },
    {
      heading: "Total Deposits",
      subheading: "$ 78,342",
      // href: "/users",
      // search: "ActiveUser",
      // state: {
      //   id: "ACTIVE",
      // },
    },
    // {
    //   heading: "Total Active Delivery Partner",
    //   subheading: getDashboardData?.totalActiveDeliveryPartner,
    // },
    {
      heading: "APY",
      subheading: "+ 12.3%",
      // href: "/retailer",
      // search: "ActiveRetailer",
      // state: {
      //   id: "ACTIVE",
      // },
    },
    {
      heading: "ETH",
      subheading: getDashboardData?.totalActiveDoctor,
      // href: "/doctor",
      // search: "ActiveDoctor",
      // state: {
      //   id: "ACTIVE",
      // },
    },

  ];

  useEffect(() => {
    dashboardData();
  }, []);
  return (
    <Page title="Overview">
      <Box className={classes.headBox}>
        <Typography variant="h1">Overview</Typography>
        <Divider className={classes.divider} />
        <Box mt={5}>
          <Grid container spacing={3}>
            {dashboard &&
              dashboard.map((data, i) => {
                return (
                  <Grid item lg={3} md={3} sm={6} xs={12} key={i}>
                    <Box
                      className={classes.mainbox}
                      onClick={() => {
                        history.push({
                          // pathname: data.href,
                          pathname: data.href,
                          search: data?.search,
                          state: {
                            id: data?.state?.id,
                          },
                        });
                      }}
                    >
                       <Box>
                       {/* <Icon /> */}
                       </Box>
                      <Box className={classes.subbox}>
                        <Typography variant="h4" className="textColorFormate">
                          {data.heading}
                        </Typography>
                        <Typography variant="h2" className="textColorFormate">
                          {data.subheading}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Box>
    </Page>
  );
}
