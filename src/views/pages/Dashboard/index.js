import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "src/component/Page";
import Footer from "src/layouts/HomeLayout/Footer";
import { FetchOverview } from "src/APIconfig/ApiEndPoint";

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
}));

export default function Index() {
  const classes = useStyles();
  const [getUserposrtFolio, setGetportfolio] = useState();

  const getOverview = async () => {
    const response = await FetchOverview()
    if (response?.responseCode === 200) {
      setGetportfolio(response.result[0])
    }
  }

  useEffect(() => {
    getOverview();
  }, []);


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
                  $ {getUserposrtFolio?.totalAssets}
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
                  $ {getUserposrtFolio?.totalSupply}
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
                  $ {getUserposrtFolio?.totalBorrow}
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

      <Footer />
    </Page>
  );
}
