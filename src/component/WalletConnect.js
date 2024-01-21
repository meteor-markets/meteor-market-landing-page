import React,{ useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography,makeStyles } from '@material-ui/core';
import { CgCloseO } from "react-icons/cg";
import ConnectWallet from './ConnectWalletPopUp';
import { SUPPORTED_WALLETS } from "src/connectors";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";


const useStyles = makeStyles((theme) => ({

    //   .MuiButton-root:hover
    walletBtns:{
      background: "rgb(255 255 255 / 20%)",
      border:"2px solid rgb(255 255 255 / 10%)",
      marginBottom:"15px",
    //   padding: "0px 0px",

      "& :hover": {
        background: "linear-gradient(90deg, #FC4A1A, #FF9142) !important",
        boxShadow:"none",
        backgroundColor: "transparent !important",
        // border:"2px solid #fff"
      },
      "& img":{
        marginRight:"10px"
      }
    },
    closeBtn:{
        position: "absolute",
        top: "0px",
        right: "0px",
        fontSize: "1.7rem",
        color: "#fff",
        cursor:"pointer"
    }
  }));



export default function WalletConnect({ open, handleClose}) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      handleClose();
    }
  }, [account]);
console.log("SUPPORTED_WALLETS",SUPPORTED_WALLETS);
  return (
    <div>
      <Dialog
      fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // style={{position:"relative"}}
      >
        <DialogContent>
          <Typography variant="h4" align="center">Connect a wallet</Typography>
          <Typography variant="body1" align="center" style={{marginTop:"10px",marginBottom:"20px"}}>By connecting your wallet, you agree to our Terms of Service and our Privacy Policy</Typography>
          {/* <ConnectWallet
          open={open}
          handleClose={handleClose}
        /> */}

        {SUPPORTED_WALLETS.map((item, i) => {
          return (
            <Button fullWidth variant="contained" className={classes.walletBtns} 
            onClick={() => {
                  window.sessionStorage.removeItem("walletName");
                  window.sessionStorage.setItem("walletName", item.name);
                  user.connectWallet(item.data);
                }}><img src={item.data.iconName}/>{item.data.name}</Button>
          );
        })}
          {/* <Button fullWidth variant="contained" className={classes.walletBtns}><img src='../images/metamaskW.png'/>Install Metamask</Button>
          <Button fullWidth variant="contained" className={classes.walletBtns}><img src='../images/coinbaseW.png'/>Coinbase Wallet</Button>
          <Button fullWidth variant="contained" className={classes.walletBtns}><img src='../images/walletconnectW.png'/>Wallet Connect</Button>
          <Button fullWidth variant="contained" className={classes.walletBtns}><img src='../images/blocto.png'/>Phantom</Button>
          <Button fullWidth variant="contained" className={classes.walletBtns}><img src='../images/safepal.png'/>Safepal</Button> */}
          <Button fullWidth variant="contained" className={classes.walletBtns}>Learn About Wallet</Button>
        </DialogContent>
        <DialogActions>
          {/* <Button
            variant="containedPrimary"
            onClick={() => {
              handleClose();
            }}
            className={classes.closeBtn}
          > */}
            <CgCloseO className={classes.closeBtn} onClick={() => {
              handleClose();
            }}/>
          {/* </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
