import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Divider,
  Icon,
} from "@material-ui/core";
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
  // totalLockedBox: {
  //   backgroundColor: "rgb(28, 28, 28)",
  //   borderRadius: "9px",
  //   "& h4": {
  //     color: "#FF9142",
  //     marginBottom: "3px",
  //   },
  // },
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

  // useEffect(() => {
  //   dashboardData();
  // }, []);
  return (
    <Page title="Overview">
      <Box className={classes.headBox}>
        {/* <Typography variant="h1">Comming Soon...</Typography>
        <Divider className={classes.divider} /> */}
        {/* <Box mt={5}>
          <Grid container spacing={3}>
            {dashboard &&
              dashboard.map((data, i) => {
                return (
                  <Grid item lg={3} md={3} sm={6} xs={12} key={i}>
                    <Box
                      className={classes.mainbox}
                      onClick={() => {
                        history.push({
                          pathname: data.href,
                          search: data?.search,
                          state: {
                            id: data?.state?.id,
                          },
                        });
                      }}
                    >
                       <Box>
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
        </Box> */}
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
                  Total assets
                </Typography>
                <Typography variant="h2" className="textColorFormate">
                  $ 87.743
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
                  Total deposits
                </Typography>
                <Typography variant="h2" className="textColorFormate">
                  $ 78,342
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
                  APY
                </Typography>
                <Typography variant="h2" className="textColorFormate">
                  + 12.3%
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
                  src={"../images/eth-icon.png"}
                />
              </Box>
              <Box>
                {/* <Typography variant="h4" className="textColorFormate">
                    Assets
                  </Typography> */}
                <Typography variant="h2" className="textColorFormate">
                  $ 78,342
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box className={classes.analyticsBox}>
          <img
            alt=""
            style={{
              objectFit: "cover",
            }}
            width="100%"
            src={"../images/group-anlytics.png"}
          />
        </Box>
      </Box>
    </Page>
  );
}
