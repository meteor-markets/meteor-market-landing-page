import React,{ useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography,makeStyles } from '@material-ui/core';
import { CgCloseO } from "react-icons/cg";
import { SUPPORTED_WALLETS } from "src/connectors";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";


const useStyles = makeStyles((theme) => ({

    walletBtns:{
      background: "rgb(255 255 255 / 20%)",
      border:"2px solid rgb(255 255 255 / 10%)",
      marginBottom:"15px",

      "& :hover": {
        background: "linear-gradient(90deg, #FC4A1A, #FF9142) !important",
        boxShadow:"none",
        backgroundColor: "transparent !important",
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
    if (account || user.accounts) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account,user.accounts]);


   const getCoinbaseWalletProvider = () => {
    if ("coinbaseSolana" in window) {
      return window.coinbaseSolana;
    }
    // Redirect user if Coinbase Wallet isn’t installed
    window.open("https://www.coinbase.com/wallet", "_blank");
  };
  
  // Phantom Provider
   const getPhantomProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;
  
      if (provider?.isPhantom) {
        return provider;
      }
    }
  
    window.open("https://phantom.app/", "_blank");
  };
  const onWalletConnectHandler = async (connector) => {
    // setIsLoading(true);
    await user.connectWallet(connector);
    // setIsLoading(false);
  };
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
         
        {SUPPORTED_WALLETS.map((data, i) => {
          return (
            <Button fullWidth variant="contained"   className={classes.walletBtns} 
            onClick={() => {
              if (data.data.name==="Coinbase Wallet") {
                user.connetAnotherWallet(getCoinbaseWalletProvider())
              }else if(data.data.name==="Phantom Wallet"){
                user.connetAnotherWallet(getPhantomProvider())
              }else{
                onWalletConnectHandler(data.data);
              }
                 
                }}><img src={data.data.iconName} alt="icon-name"/>{data.data.name}</Button>
          );
        })}
          </DialogContent>
        <DialogActions>
          
            <CgCloseO className={classes.closeBtn} onClick={() => {
              handleClose();
            }}/>
        </DialogActions>
      </Dialog>
    </div>
  );
}


