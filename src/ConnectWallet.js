import React, { useContext, useEffect, useState } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { Box, Button, Dialog, Tooltip, Typography, makeStyles } from "@material-ui/core";
import { UserContext } from "./Context/User";
import { FetchCoinList, FetchOverview, connectWallet, getProfileHandler } from "./APIconfig/ApiEndPoint";
import { FaArrowRight, FaSignOutAlt } from "react-icons/fa";
import PerfectScrollbar from "react-perfect-scrollbar";
import ConfirmationDialog from "./ConfirmationDialog";
import { sortAddress } from "./utils";
import CopyToClipboard from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useDispatch, useSelector } from "react-redux";
import { addOverviewDetails, addWalletDetails } from "./Store/walletSlice";

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

const sections = [

  {
    title: "View on EXplorer",
    href: "",
    icon: FaArrowRight,
  },
  {
    title: "Disconnect",
    href: "/dashboard",
    icon: FaSignOutAlt,
  },
];
const ConnectWallet = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [CoinName, setCoinName] = useState();
  const [open, setOpen] = useState(false);
  const [rightBar, setRightBar] = useState(false);
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [
    ethersProvider,
    setProvider
  ] = useState();
  const [account, setAccount] = useState(null);
  
  useEffect(() => {
    if (wallet?.provider) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {};
      let data =
      {
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url }
      }
      walletConect(wallet.accounts[0].address)
      localStorage.setItem("walletDetails", JSON.stringify(data))
      sessionStorage.setItem("userAddress",wallet.accounts[0].address)
      dispatch(addWalletDetails(data))
      setAccount(data);
    }
  }, [wallet]);

  // connect wallet api 
  const walletConect = async (address) => {
    const response = await connectWallet(address)
    sessionStorage.setItem("token", response?.token)
    getOverview(response?.token)
    FetchCoin()
  }

  const getOverview = async (token) => {
    const response = await FetchOverview(token)
    if (response?.responseCode === 200) {
     dispatch(addOverviewDetails(response.result[0])) 
    }
  }


  useEffect(() => {
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
    }
  }, [wallet]);


 

  const FetchCoin = async () => {
    setCoinName([])
    const response = await FetchCoinList()
    if (response?.length > 0) {
      let filterData = response?.filter((ele) => ele?.chainId == "chainId")

      setCoinName(filterData[1])
    }
  }
 

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      {open && (
        <ConfirmationDialog
          open={open}
          handleClose={() => setOpen(false)}
          title={"Disconnect"}
          desc={"Do you want to Disconnect ?"}
          confirmationHandler={confirmationHandler}
          style={{ color: "#fff" }}
        />
      )}
      <PerfectScrollbar
        options={{ suppressScrollX: true }}
        className="walletbox"
      >
        <Box>
          <Typography variant="h6" align="left" className="textColorFormate">
            {CoinName?.CoinName}
          </Typography>
          <Typography
            variant="caption"
            className="textColorFormate"
            align="left"
          >

          </Typography>
        </Box>
        <div style={{ borderBottom: "1px solid White", height: 10 }}></div>
        <Box pt={1}>
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <Button
                fullWidth
                className={classes.btnHover}
                style={{
                  justifyContent: "left",
                  color: "white",
                  textTransform: "capitalize",
                }}
                key={i}
                onClick={() =>handleDisconnectWallet() }
              >
                <Icon color="white" /> &nbsp;&nbsp;{section.title}
              </Button>
            );
          })}
        </Box>
      </PerfectScrollbar>
    </Box>
  );
  const handleDisconnectWallet =()=>{
    setAccount(null)
    disconnect({ label: wallet.label })
    setOpen(false)
    sessionStorage.removeItem("userAddress")
    sessionStorage.removeItem("token")
    setRightBar(false)
    dispatch(addWalletDetails({}))
    dispatch(addOverviewDetails({})) 

  }
  return (
    <div>
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" pr={2}>
      {CoinName?.coinImage &&
        <img src={CoinName?.coinImage} alt="image" style={{width:"30px"}} />
      }
      <Typography style={{
        marginLeft: "5px",
        color: "#fff",
        cursor: "pointer",
      }}>
      {/*
      {getBalance && getBalance} 
    */}
      <span>{CoinName?.coinName}</span>
      </Typography>
      </Box>

      {account?.address ? (
        <Button
          px={3}
          variant="contained"
          className={classes.connectWalletBtn}
          // onClick={handleDesconnect}
          onClick={() => {
            setRightBar(!rightBar);
          }}
        >
          {/* {account} */}
          {sortAddress(account?.address)}
          <Tooltip title="Copy">
            <CopyToClipboard text={account}>
              <FileCopyIcon
                style={{
                  marginLeft: "5px",
                  color: "#fff",
                  cursor: "pointer",
                }}
                fontSize="small"
                onClick={() => toast.info("Copied", {
                  position: toast.POSITION.BOTTOM_RIGHT
                })}
              />
            </CopyToClipboard>
          </Tooltip>
        </Button>
      ) : (
        <Button
        variant="contained"
        className={classes.supplyBtns}
        disabled={connecting} onClick={() => connect()}
      >
        Connect
      </Button>
      )}

     
      <Dialog
        classes={{ paper: classes.desktopDrawer }}
        open={rightBar}
        onClose={() => {
          setRightBar(false);
        }}
      >
        {content}
      </Dialog>
    </Box>
     

    </div>
  );
};

export default ConnectWallet;
