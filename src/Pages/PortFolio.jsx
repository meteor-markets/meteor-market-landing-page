import React, { useState, useEffect, useMemo } from "react";
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
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import PropTypes from "prop-types";
import Footer from "../HomeLayout/Footer";
import Page from "../Component/Page";
import Apiconfigs from "../APIconfig/ApiConfig";
import { Pagination } from "@material-ui/lab";
import { FetchUserPortfolio } from "../APIconfig/ApiEndPoint";

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
    "& h4": {
      color: "#FF9142",
      marginBottom: "3px",
    },
    [theme.breakpoints.down("xs")]: {
      "& h4": {
        fontSize: "16px"
      },
      "& h2": {
        fontSize: "26px"
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

const PortFolio = () => {
  const classes = useStyles();
  const [getUserposrtFolio, setGetportfolio] = useState();
  let userAdress = sessionStorage.getItem("userAddress");
  const getUserProfile = async () => {
    const response = await FetchUserPortfolio()
    if (response?.responseCode === 200) {
      let assets = response?.result.assets;
      assets = assets.filter(a => ['SNX', 'DAI'].indexOf(a.coinName) < 0);
      response.result.assets = assets;
      setGetportfolio(response?.result)
    }
  }

  useEffect(() => {
    console.log("userAdress",userAdress);
    if (userAdress) {

      getUserProfile();
    }
  }, [userAdress]);


  let PageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const checkLastPage = useMemo(() => {
    let frstPgae = (currentPage - 1) * PageSize;
    let lastPage = frstPgae + PageSize;
    return getUserposrtFolio?.assets?.slice(frstPgae, lastPage)?.map((row, index) => ({
      ...row,
      // Adjusting index on the first page and adding count from the second page onward
      srID: index + 1 + (currentPage > 1 ? frstPgae : 0),
    }));
  }, [currentPage, getUserposrtFolio, PageSize]);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
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
                    ${getUserposrtFolio?.supplyBalance}
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
                    {getUserposrtFolio?.netAPY}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box className={classes.numberBox} p={3} pb={0}>
                <Box>
                  <Typography variant="h4">Your Borrow Balance</Typography>
                  <Typography variant="h2" className="textColorFormate">
                    ${getUserposrtFolio?.borrowBalance}
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
                    {getUserposrtFolio?.borrowLimit}%
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
              {checkLastPage &&
                checkLastPage?.map((data, index) => {
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
                      <TableCell>{data.supplyAmount}M</TableCell>
                      <TableCell>{data.supplyAPY}%</TableCell>
                      <TableCell>{data.supplyBalance}M</TableCell>
                      <TableCell>{data.borrowAmount}M</TableCell>
                      <TableCell>{data.borrowAPY}%</TableCell>
                      <TableCell>{data.bRewardAPR}</TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
          {getUserposrtFolio?.assets && getUserposrtFolio?.assets.length > 1 && (
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
                count={Math.ceil(getUserposrtFolio?.assets?.length / PageSize)} // Calculate total number of pages
                color="primary"
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>
          )}
        </TableContainer>

      </Box>
      <Footer />
    </Page>
  );
}
export default PortFolio

