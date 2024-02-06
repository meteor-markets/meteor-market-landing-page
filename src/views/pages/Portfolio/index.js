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
import Footer from "src/layouts/HomeLayout/Footer";

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
    backgroundColor: "rgb(28, 28, 28)",
    borderRadius: "9px",
    padding: "50px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height:"100%",
    "& h4": {
      color: "#FF9142",
      marginBottom: "3px",
    },
    [theme.breakpoints.down("xs")]:{
      "& h4": {
        fontSize:"16px"
      },
      "& h2": {
        fontSize:"26px"
      },
    }
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
    supplyAmount:"$374.40M",
    rewardAPR: "0.38%",
    wallet: "1.51M DAI",
    totalSupply: "$374.40M",
    totalBorrow: "$374.40M",
    borrowAPY: "0.38%",
    borrowedAmount:""
  },
  {
    id: 2,
    asset: "LUSD",
    assetIconSrc: "../images/LUSD-logo1.png",
    supplyApy: "3.56%",
    supplyAmount:"$283.09M",
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
        <Box mb={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box className={classes.numberBox} p={3} pb={0}>
                <Box>
                  <Typography variant="h4">Your Supply Balance</Typography>
                  <Typography variant="h2" className="textColorFormate">
                    $1.00M
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" style={{ textAlign: "end" }}>
                    Net APY
                  </Typography>
                  <Typography
                    variant="h2"
                    className="textColorFormate"
                    style={{ textAlign: "end" }}
                  >
                    -3%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box className={classes.numberBox} p={3} pb={0}>
                <Box>
                  <Typography variant="h4">Your Borrow Balance</Typography>
                  <Typography variant="h2" className="textColorFormate">
                    $500.00K
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" style={{ textAlign: "end" }}>
                    Your Borrow Limit
                  </Typography>
                  <Typography
                    variant="h2"
                    className="textColorFormate"
                    style={{ textAlign: "end" }}
                  >
                    60.5%
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <TableContainer style={{ background: "#1C1C1C" }}>
          <Table style={{ minWidth: "900px" }}>
            <TableHead>
              <TableRow className={`${classes.tablerow1} tableHead`}>
                <TableCell>Assets</TableCell>
                <TableCell>Supplied Amount</TableCell>
                <TableCell>Supply APY</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Borrowed Amount</TableCell>
                <TableCell>Borrow APY</TableCell>
                <TableCell>Balance</TableCell>
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
                      <TableCell>{data.supplyAmount}</TableCell>
                      <TableCell>{data.supplyApy}</TableCell>
                      <TableCell>{data.totalSupply}</TableCell>
                      <TableCell>{data.totalBorrow}</TableCell>
                      <TableCell>{data.borrowAPY}</TableCell>
                      <TableCell>{data.wallet}</TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
    </Page>
  );
}
