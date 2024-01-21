import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  makeStyles,
  AppBar,
  Tabs,
  Tab,
} from "@material-ui/core";
import Page from "src/component/Page";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import PropTypes from "prop-types";
import Transaction from "./Transaction";
import Deposit from "./Deposit";
import Footer from "src/layouts/HomeLayout/Footer";

const useStyles = makeStyles((theme) => ({
  headBox: {
    // padding: "23px 30px",
    borderRadius: "9px",
    // background: "#1C1C1C",
  },

  detailsBtns: {
    padding: "0px 5px ",
    marginRight: "10px",
    border: "2px solid rgb(255 255 255 / 10%)",
    background: "rgb(255 255 255 / 20%)",
  },
  supplyBtns: {
    padding: "0px 5px ",
  },
  root: {
    backgroundColor: "transparent",
    width: "100%",
  },
  numberBox: {
    "& h4": {
      color: "#FF9142",
      marginBottom: "3px",
    },
  },
  tabsAppBar:{
    padding:"20px 0px"
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}


export default function Index() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  useEffect(() => {
    dashboardData();
  }, []);
  return (
    <Page title="Wallet">
      <Box className={classes.headBox}>
        <Box className={classes.root}>
        
          <AppBar position="static" className={classes.tabsAppBar}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              indicatorColor={""}
              // style={}
            >
              <Tab label="Deposit" {...a11yProps(0)} />
              <Tab label="Widthrawal" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Deposit/>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <Box mb={5}>
          
          <Typography variant="h2"> Coming Soon</Typography></Box>
          </TabPanel>
        </Box>
       <Transaction/>
      </Box>
      <Footer/>
    </Page>
  );
}
