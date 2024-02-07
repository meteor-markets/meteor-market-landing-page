import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
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
import PropTypes from "prop-types";
import Footer from "src/layouts/HomeLayout/Footer";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import SupplyDialogBox from "src/component/SupplyDialogBox";
import WithdrawDialogBox from "src/component/WithdrawDialogBox";
import BorrowDialogBox from "src/component/BorrowDialogBox";
import RepayDialogBox from "src/component/RepayDialogBox";
import { FetchCoinList } from "src/APIconfig/ApiEndPoint";

const useStyles = makeStyles((theme) => ({
  headBox: {
    borderRadius: "9px",
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
    padding: "4px 10px ",
    minWidth: "100px",
    marginLeft: "15px",
    border: "2px solid rgb(255 255 255 / 10%)",
    background: "rgb(255 255 255 / 20%)",
  },
  supplyBtns: {
    border: "2px solid transparent",
    padding: "4px 10px ",
    minWidth: "100px",
  },
  root: {
    backgroundColor: "transparent",
    width: "100%",
  },
  numberBox: {
    backgroundColor: "rgb(28, 28, 28)",
    borderRadius: "9px",
    padding: "50px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& h4": {
      color: "#FF9142",
      marginRight: "20px",
      maxWidth: "85px",
      textAlign: "center",
    },
  },
  tabsAppBar: {
    padding: "20px 20px",
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
  const [value, setValue] = useState(0);
  const [openSupplyModel, setSupplyModel] = useState(false);
  const [openWithdrawModel, setWithdrawModel] = useState(false);
  const [openBorrowModel, setBorrowModel] = useState(false);
  const [openRepayModel, setRepayModel] = useState(false);
  const [supplyData, setSupplyData] = useState({});

  const [CoinName, setCoinName] = useState();

  const FetchCoin = async () => {
    const response = await FetchCoinList()
    if (response?.length > 0) {

      setCoinName(response)
    }
  }
  useEffect(()=>{
    FetchCoin()
  },[])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const handleOpenModel = (type,data)=>{
    setSupplyData(data)
    if(type==="Supply"){
      setSupplyModel(true);
    }else if(type==="Withdraw"){
      setWithdrawModel(true);
    }else if(type==="Borrow"){
      setBorrowModel(true);
    }else{
      setRepayModel(true);
    }
  }

  const handleCloseModel = ()=>{
    setSupplyModel(false);
    setWithdrawModel(false);
    setBorrowModel(false);
    setRepayModel(false);
  }

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
        // setDashboardData(res?.data?.result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    dashboardData();
  }, []);
  return (
    <Page title="Lending">
      <Box className={classes.headBox}>
        <Box mb={5}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box className={classes.numberBox}>
                <Typography variant="h4">Supplied Assets</Typography>
                <Typography variant="h2" className="textColorFormate">
                  $1871,560.70
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box className={classes.numberBox}>
                <Typography variant="h4">Borrowed Assets</Typography>
                <Typography variant="h2" className="textColorFormate">
                  $3876,617.38
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <TableContainer style={{ background: "#1C1C1C" }}>
          <Box className={classes.root}>
            <AppBar position="static" className={classes.tabsAppBar}>
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
                  {CoinName &&
                    CoinName.map((data, index) => {
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
                                src={data.coinImage}
                              />
                              <span>{data.coinName}</span>
                            </Box>
                          </TableCell>
                          <TableCell>{data.supplyAPY}%</TableCell>
                          <TableCell>
                            <Box display={"flex"} alignItems={"center"}>
                              <span>{data.sRewardAPR}%</span>{" "}
                              <HiOutlineExclamationCircle
                                color="#00FFA3"
                                fontSize={"18px"}
                                style={{ marginLeft: "9px" }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>{data?.wallet}{data?.coinName}</TableCell>
                          <TableCell align="center">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Button
                                variant="contained"
                                className={classes.supplyBtns}
                                onClick={(e)=>handleOpenModel("Supply",data)}
                              >
                                Supply
                              </Button>
                              <Button
                                variant="contained"
                                className={classes.detailsBtns}
                                onClick={(e)=>handleOpenModel("Withdraw")}
                              >
                                Withdraw
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
                          <TableCell>
                            <Box display={"flex"} alignItems={"center"}>
                              <span>{data.rewardAPR}</span>{" "}
                              <HiOutlineExclamationCircle
                                color="#00FFA3"
                                fontSize={"18px"}
                                style={{ marginLeft: "9px" }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>{data.wallet}</TableCell>
                          <TableCell align="center">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Button
                                variant="contained"
                                className={classes.supplyBtns}
                                onClick={(e)=>handleOpenModel("Borrow")}
                              >
                                Borrow
                              </Button>
                              <Button
                                variant="contained"
                                className={classes.detailsBtns}
                                onClick={(e)=>handleOpenModel()}
                              >
                                Repay
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
      <SupplyDialogBox open={openSupplyModel} handleClose={handleCloseModel} supplyData={supplyData}/>
      <WithdrawDialogBox open={openWithdrawModel} handleClose={handleCloseModel}/>
      <BorrowDialogBox open={openBorrowModel} handleClose={handleCloseModel}/>
      <RepayDialogBox open={openRepayModel} handleClose={handleCloseModel}/>
      <Footer />
    </Page>
  );
}
