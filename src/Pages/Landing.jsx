import React, { useState, useEffect, useMemo } from "react";
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
} from "@material-ui/core";
import PropTypes from "prop-types";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { Pagination } from "@material-ui/lab";
import Page from "../Component/Page";
import Apiconfigs from "../APIconfig/ApiConfig";
import BorrowDialogBox from "../Component/BorrowDialog";
import RepayDialogBox from "../Component/RepayDialogBox";

import SupplyDialogBox from "../Component/SupplyDialogBox";
import WithdrawDialogBox from "../Component/WithdrawDialogBox";
import { FetchCoinList } from "../APIconfig/ApiEndPoint";
import Footer from "../HomeLayout/Footer";
import { useSelector } from "react-redux";
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


 const Landing=()=> {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [openSupplyModel, setSupplyModel] = useState(false);
  const [openWithdrawModel, setWithdrawModel] = useState(false);
  const [openBorrowModel, setBorrowModel] = useState(false);
  const [openRepayModel, setRepayModel] = useState(false);
  const [supplyData, setSupplyData] = useState({});
  const [CoinName, setCoinName] = useState();
  const userDetails = useSelector(state => state.walletDeatils.userDetails);
  const getLendingPageCoinDetails = useSelector(state => state.walletDeatils.getLendingPageCoinDetails);

  console.log("userDetails", supplyData);
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



// Pagination 
let PageSize = 5;
const [currentPage, setCurrentPage] = useState(1);
  const checkLastPage = useMemo(() => {
    let frstPgae = (currentPage - 1) * PageSize;
    let lastPage = frstPgae + PageSize;
    return getLendingPageCoinDetails?.slice(frstPgae, lastPage)?.map((row, index) => ({
        ...row,
        // Adjusting index on the first page and adding count from the second page onward
        srID: index + 1 + (currentPage > 1 ? frstPgae : 0),
    }));
}, [currentPage, getLendingPageCoinDetails,PageSize]);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
};


  return (
    <Page title="Lending">
      <Box className={classes.headBox}>
        <Box mb={5}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box className={classes.numberBox}>
                <Typography variant="h4">Supplied Assets</Typography>
                <Typography variant="h2" className="textColorFormate">
                  ${userDetails?.totalSupply}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box className={classes.numberBox}>
                <Typography variant="h4">Borrowed Assets</Typography>
                <Typography variant="h2" className="textColorFormate">
                  ${userDetails?.totalBorrow}
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
                  {checkLastPage &&
                    checkLastPage.map((data, index) => {
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
                          <TableCell>{data.SupplYAPY}%</TableCell>
                          <TableCell>
                            <Box display={"flex"} alignItems={"center"}>
                              <span>{data.supplyAPR?.toFixed(4)}%</span>{" "}
                              <HiOutlineExclamationCircle
                                color="#00FFA3"
                                fontSize={"18px"}
                                style={{ marginLeft: "9px" }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>{data?.WalletBalnce} {data?.coinName}</TableCell>
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
                                onClick={(e)=>handleOpenModel("Withdraw",data)}
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
              {CoinName && CoinName.length > 4 && (
                <Box
                  mb={2}
                  mt={2}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                  count={Math.ceil(CoinName?.length / PageSize)} // Calculate total number of pages
                  color="primary"
                  page={currentPage}
                  onChange={handlePageChange}
                  />
                </Box>
              )}
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
                  {checkLastPage &&
                    checkLastPage.map((data, index) => {
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
                          <TableCell>{data.borrowAPY}%</TableCell>
                          <TableCell>
                            <Box display={"flex"} alignItems={"center"}>
                              <span>{data?.borrow_apr?.toFixed(4)}</span>{" "}
                              <HiOutlineExclamationCircle
                                color="#00FFA3"
                                fontSize={"18px"}
                                style={{ marginLeft: "9px" }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>{data.liquidity} {data.coinName}</TableCell>
                          <TableCell align="center">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Button
                                variant="contained"
                                className={classes.supplyBtns}
                                onClick={(e)=>handleOpenModel("Borrow",data)}
                              >
                                Borrow
                              </Button>
                              <Button
                                variant="contained"
                                className={classes.detailsBtns}
                                onClick={(e)=>handleOpenModel("Repay",data)}
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
              {CoinName && CoinName.length > 4 && (
          <Box
            mb={2}
            mt={2}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
            count={Math.ceil(CoinName?.length / PageSize)} // Calculate total number of pages
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
            />
          </Box>
        )}
            </TabPanel>
          </Box>
        </TableContainer>
      </Box>
      <SupplyDialogBox open={openSupplyModel} FetchCoin={FetchCoin} handleClose={handleCloseModel} supplyData={supplyData}/>
      <WithdrawDialogBox open={openWithdrawModel} handleClose={handleCloseModel} FetchCoin={FetchCoin} supplyData={supplyData}/>
      <BorrowDialogBox open={openBorrowModel} handleClose={handleCloseModel} FetchCoin={FetchCoin} supplyData={supplyData}/>
      <RepayDialogBox open={openRepayModel} handleClose={handleCloseModel} FetchCoin={FetchCoin} supplyData={supplyData}/>
      <Footer />
    </Page>
  );
}


export default Landing
