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
  detailsBtns: {
    padding: "0px 5px ",
    // marginRight: "10px",
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
  totalLockedBox: {
    backgroundColor: "rgb(28, 28, 28)",
    borderRadius: "9px",
    "& h4": {
      color: "#FF9142",
      marginBottom: "3px",
    },
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    // "&:nth-of-type(even)": {
    //   backgroundColor: " #253d2f87",
    // },
    border: "none",
  },
}))(TableRow);

const tableData = [
  {
    id: 1,
    asset: "DAI",
    assetIconSrc: "../images/DAI-logo1.png",
    supplyApy: "5.47%",
    rewardAPR: "0.38%",
    wallet: "1.51M DAI",
    totalSupply: "$374.40M",
    totalBorrow: "$374.40M",
    borrowAPY: "0.38%",
  },
  {
    id: 2,
    asset: "LUSD",
    assetIconSrc: "../images/LUSD-logo1.png",
    supplyApy: "3.56%",
    rewardAPR: "0.79%",
    wallet: "284K LUSD",
    totalSupply: "$283.09M",
    totalBorrow: "$283.09M",
    borrowAPY: "0.79%",
  },
];

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

  useEffect(() => {
    dashboardData();
  }, []);
  return (
    <Page title="Landing">
      <Box className={classes.headBox}>
        <Box p={3} mb={4} className={classes.totalLockedBox}>
          <Typography variant="h4">Total Value Locked</Typography>
          <Typography variant="h3" className="textColorFormate">
            $41,627,014.38
          </Typography>
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
                    Total Supply
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
                    Total Borrow
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
                    Available Liquidity
                  </Typography>
                  <Typography variant="h2" className="textColorFormate">
                    $78,455.95
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
                    Assets
                  </Typography>
                  <Typography variant="h2" className="textColorFormate">
                    48
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
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
          <Box p={3} pb={0}>
            <Typography variant="h4" className="textColorFormate">
              Total Assets
            </Typography>
          </Box>
          <Table style={{ minWidth: "900px" }}>
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell>Asset</TableCell>
                <TableCell>Total Supply</TableCell>
                <TableCell>Supply APY/LTV</TableCell>
                <TableCell>Total Borrow</TableCell>
                <TableCell>Borrow APY</TableCell>
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
                      <TableCell>{data.totalSupply}</TableCell>
                      <TableCell>{data.totalBorrow}</TableCell>
                      <TableCell>{data.borrowAPY}</TableCell>
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
                        </Box>
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Page>
  );
}
