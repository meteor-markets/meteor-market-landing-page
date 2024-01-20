import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Divider,
  Icon,
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableRow,
  Button,
  withStyles,
  AppBar,
  Tabs,
  Tab,
  useTheme,
} from "@material-ui/core";
import Page from "src/component/Page";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";
import { useHistory } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  headBox: {
    // padding: "23px 30px",
    borderRadius: "9px",
    // background: "#1C1C1C",
    "& h3": {
      color: "black",
      marginBottom: "15px",
    },
  },
  mainbox: {
    background: "#1C1C1C",
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
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    // "&:nth-of-type(even)": {
    //   backgroundColor: " #253d2f87",
    // },
    border: "none",
  },
}))(TableRow);

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

const tableData = [
  {
    id: 1,
    asset: "DAI",
    assetIconSrc: "../images/DAI-logo1.png",
    supplyApy: "5.47%",
    rewardAPR: "0.38%",
    wallet: "0.00 DAI",
  },
  {
    id: 2,
    asset: "LUSD",
    assetIconSrc: "../images/LUSD-logo1.png",
    supplyApy: "3.56%",
    rewardAPR: "0.79%",
    wallet: "0.00 LUSD",
  },
];

export default function Index() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
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
    <Page title="Landing">
      <Box className={classes.headBox}>
        <Box mb={4}>
          <Grid container spacing={3}>
            <Grid item lg={6}>
              <TableContainer style={{ background: "#1C1C1C" }}>
                <Box className={classes.numberBox} p={3} pb={0}>
                  <Typography variant="h4">Supplied Assets</Typography>
                  <Typography variant="h2" className="textColorFormate">
                    $1871,560.70
                  </Typography>
                </Box>
                <Table style={{ minWidth: "500px" }}>
                  <TableHead>
                    <TableRow className={`${classes.tablerow1} tableHead`}>
                      <TableCell>Asset</TableCell>
                      <TableCell>Supply APY</TableCell>
                      <TableCell>Reward APR</TableCell>
                      <TableCell>Wallet</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData &&
                      tableData.map((data, index) => {
                        return (
                          <StyledTableRow>
                            <TableCell>
                              <Box display={"flex"} alignItems={"center"}>
                                <img
                                  alt=""
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    borderRadius: "5px",
                                    objectFit: "cover",
                                    marginRight: "15px",
                                  }}
                                  width="100%"
                                  src={data.assetIconSrc}
                                />
                                <span>{data.asset}</span>
                              </Box>
                            </TableCell>
                            <TableCell>{data.supplyApy}</TableCell>
                            <TableCell>{data.rewardAPR}</TableCell>
                            <TableCell>{data.wallet}</TableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item lg={6}>
              <TableContainer style={{ background: "#1C1C1C" }}>
                <Box className={classes.numberBox} p={3} pb={0}>
                  <Typography variant="h4">Borrowed Assets</Typography>
                  <Typography variant="h2" className="textColorFormate">
                   $3876,617.38
                  </Typography>
                </Box>
                <Table style={{ minWidth: "500px" }}>
                  <TableHead>
                    <TableRow className={`${classes.tablerow1} tableHead`}>
                      <TableCell>Asset</TableCell>
                      <TableCell>Borrow APY</TableCell>
                      <TableCell>Reward APR</TableCell>
                      <TableCell>Liquidity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData &&
                      tableData.map((data, index) => {
                        return (
                          <StyledTableRow>
                            <TableCell>
                              <Box display={"flex"} alignItems={"center"}>
                                <img
                                  alt=""
                                  style={{
                                    width: "25px",
                                    height: "25px",
                                    borderRadius: "5px",
                                    objectFit: "cover",
                                    marginRight: "15px",
                                  }}
                                  width="100%"
                                  src={data.assetIconSrc}
                                />
                                <span>{data.asset}</span>
                              </Box>
                            </TableCell>
                            <TableCell>{data.supplyApy}</TableCell>
                            <TableCell>{data.rewardAPR}</TableCell>
                            <TableCell>{data.wallet}</TableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
        <TableContainer style={{ background: "#1C1C1C" }}>
          <Box className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                indicatorColor={""}
              >
                <Tab label="Supply Assets" {...a11yProps(0)} />
                <Tab label="Borrow Assets" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Table style={{ minWidth: "900px" }}>
                <TableHead>
                  <TableRow className={`${classes.tablerow1} tableHead`}>
                    <TableCell>Asset</TableCell>
                    <TableCell>Supply APY</TableCell>
                    <TableCell>Reward APR</TableCell>
                    <TableCell>Wallet</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData &&
                    tableData.map((data, index) => {
                      return (
                        <StyledTableRow>
                          <TableCell>
                            <Box display={"flex"} alignItems={"center"}>
                              <img
                                alt=""
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  borderRadius: "5px",
                                  objectFit: "cover",
                                  marginRight: "15px",
                                }}
                                width="100%"
                                src={data.assetIconSrc}
                              />
                              <span>{data.asset}</span>
                            </Box>
                          </TableCell>
                          <TableCell>{data.supplyApy}</TableCell>
                          <TableCell>{data.rewardAPR}</TableCell>
                          <TableCell>{data.wallet}</TableCell>
                          <TableCell align="center">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Button
                                variant="contained"
                                className={classes.detailsBtns}
                              >
                                Details
                              </Button>
                              <Button
                                variant="contained"
                                className={classes.supplyBtns}
                              >
                                Supply
                              </Button>
                            </Box>
                          </TableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Table style={{ minWidth: "900px" }}>
                <TableHead>
                  <TableRow className={`${classes.tablerow1} tableHead`}>
                    <TableCell>Asset</TableCell>
                    <TableCell>Borrow APY</TableCell>
                    <TableCell>Reward APR</TableCell>
                    <TableCell>Liquidity</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData &&
                    tableData.map((data, index) => {
                      return (
                        <StyledTableRow>
                          <TableCell>
                            <Box display={"flex"} alignItems={"center"}>
                              <img
                                alt=""
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  borderRadius: "5px",
                                  objectFit: "cover",
                                  marginRight: "15px",
                                }}
                                width="100%"
                                src={data.assetIconSrc}
                              />
                              <span>{data.asset}</span>
                            </Box>
                          </TableCell>
                          <TableCell>{data.supplyApy}</TableCell>
                          <TableCell>{data.rewardAPR}</TableCell>
                          <TableCell>{data.wallet}</TableCell>
                          <TableCell align="center">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Button
                                variant="contained"
                                className={classes.detailsBtns}
                              >
                                Details
                              </Button>
                              <Button
                                variant="contained"
                                className={classes.supplyBtns}
                              >
                                Borrow
                              </Button>
                            </Box>
                          </TableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TabPanel>
          </Box>
        </TableContainer>
      </Box>
    </Page>
  );
}
