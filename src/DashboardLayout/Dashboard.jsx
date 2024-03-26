import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import ConnectWallet from "../ConnectWallet";
import OverviewPage from "../Pages/OverviewPage";
import { useDispatch, useSelector } from "react-redux";
import blastdexABI from '../ABI/blastdexABI.json'
import { blastCToken, mainContractAddress, wethCToken, usdbCToken, fetchBlastTokenDetails, fetchUSDBTokenDetails, fetchtokenSupplyValueForBlast, fetchOverViewForBlast } from "../constants";
import { addLendingPageCoinDetails } from "../Store/walletSlice";
// import SocialBar from "../HomeLayout/SocialBar";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    // background: "linear-gradient(to bottom, rgb(255, 255, 255) 0%, rgb(250, 213, 168) 40%, rgb(249, 191, 121) 60%, rgb(247, 168, 75) 80%, rgb(245, 146, 27) 100%)",
    backgroundColor: "#0B0B0F",
    paddingTop: 70,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    background: theme.palette.background.dark1,
  },
  content: {
    flex: "1 1 auto",
    // height: "100%",
    overflow: "hidden",
    position: "relative",
    WebkitOverflowScrolling: "touch",
    padding: "35px 35px 20px ",
    minHeight: "91vh",
    [theme.breakpoints.down("md")]: {
      padding: "10px 20px 20px ",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "10px 10px 20px ",
    },
  },
}));

const Dashboard = ({ children }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const dispatch = useDispatch()

  const web3 = useSelector(state => state.walletDeatils.web3);
  const getLendingPageCoinDetails = useSelector(state => state.walletDeatils.getLendingPageCoinDetails);
  const allBalance = useSelector(state => state.walletDeatils.allBalance);

  
console.log("getLendingPageCoinDetails",allBalance,getLendingPageCoinDetails);

  

  // fetch Supply Details 
  // useEffect(() => {
  //   if (web3) {
  //     console.log("web3",web3,dispatch );
  //   fetchtokenSupplyValueForBlast(web3,dispatch)
  //   if (allBalance?.balanceInEther) {
  //     fetchOverViewForBlast(allBalance,dispatch)
  //     const intervalId = setInterval(fetchOverViewForBlast(allBalance,dispatch), 9000);

  //     // Clean up function to clear the interval when the component unmounts or the dependency array changes
  //     return () => clearInterval(intervalId);
  //   }
  // }
  // }, [web3,allBalance?.balanceInEther]);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />

      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content} id="main-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  children: PropTypes.node,
};


export default Dashboard
