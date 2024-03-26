import React, { useContext, useState } from "react";
import {
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  InputAdornment,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { toast } from "react-toastify";
import { supplyCoins } from "../APIconfig/ApiEndPoint";
import { useDispatch, useSelector } from "react-redux";
import blastdexABI from '../ABI/blastdexABI.json'
import Web3 from "web3";
import { useConnectWallet } from "@web3-onboard/react";
import { blastCToken, fetchOverViewForBlast, fetchTotalSupplied, fetchtokenSupplyValueForBlast, mainContractAddress } from "../constants";
import { addBalllance } from "../Store/walletSlice";

const useStyles = makeStyles((theme) => ({
  closeBtn: {
    fontSize: "1.7rem",
    color: "#fff",
    cursor: "pointer",
  },
  smallText: {
    color: "rgba(255,255,255,80%)",
  },
  mediumText: {
    color: "#fff",
  },
  summryMainBox: {
    backgroundColor: "rgb(255, 255, 255, 5%)",
    borderRadius: "9px",
    padding: "20px",
  },
  dialogAction: {
    justifyContent: "start",
    paddingLeft: "24px",
    paddingRight: "24px",
  },
  DialogContent: {
    paddingLeft: "24px",
    paddingRight: "24px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0px",
      paddingRight: "0px",
    }
  }
}));

function SupplyDialogBox({ open, handleClose, supplyData, FetchCoin }) {
  
  const dispatch = useDispatch()
  const classes = useStyles();
  const balance = useSelector(state => state.walletDeatils.currentbalance);
  const web3 = useSelector(state => state.walletDeatils.web3);
  const walletData = useSelector(state => state.walletDeatils.walletData);
  const userDetails = useSelector(state => state.walletDeatils.userDetails);
  const allBalance = useSelector(state => state.walletDeatils.allBalance);

  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  console.log("supplyData", amount);
  const handleSypplyCoin = async (address,transactionHash) => {
      toast.success("Successfully Supplied")
      handleClose()
      FetchCoin()
      setAmount("")
      setIsLoading(false)
      fetchTotalSupplied(blastdexABI,walletData ,web3,dispatch)

    
  }
 
  const getSupplyToken = async (tokenName) => {
    if (web3) {
      if (amount>0) {
        let balance =""
        let balanceInEther=""
         balance = await web3.eth.getBalance(walletData?.address);
        // Convert from Wei to Ether
         balanceInEther = web3.utils.fromWei(balance, 'ether');
         if (balanceInEther>amount) {
           try {
            setIsLoading(true)
            const contract = await new web3.eth.Contract(blastdexABI, mainContractAddress)
            const amountInWei = web3.utils.toWei(amount, "ether");
            console.log("contract",contract,supplyData?.cToken);
            let result = await contract.methods.supply(amountInWei,supplyData?.cToken).send({ from: walletData?.address })
            balance = await web3.eth.getBalance(result?.from);
             balanceInEther = web3.utils.fromWei(balance, 'ether');

            dispatch(addBalllance(balanceInEther))
            if (result) {
              handleSypplyCoin(result?.from,result?.transactionHash)
              fetchtokenSupplyValueForBlast(web3,dispatch)
            }
            console.log("contract", result,balanceInEther,result?.transactionHash);
          
          } catch (error) {
            setIsLoading(false)
            toast.error(error?.message)
            console.log("ERROR", error?.message);
          }
         }else{
          toast.error(`Ballance should be less than ${balanceInEther}`)
         }
      }else{
        toast.warn("Enter a valid amount")
      }
     
      
    }
     else {
    toast.warn("Please Connect your wallet")
  }

  };

  return (
    <Box>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        style={{ backgroundColor: "#00000070" }}
        maxWidth={"md"}
      >
        <DialogActions className={classes.dialogAction}>
          <FaArrowLeftLong
            className={classes.closeBtn}
            onClick={() => {
              handleClose();
            }}
          />
          <Typography variant="h4">Supply {supplyData?.coinName}</Typography>
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
            src={supplyData?.coinImage}
          />
        </DialogActions>
        <DialogContent className={classes.DialogContent}>
          <form>
            <Box
              mt={4}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"end"}
              mb={"4px"}
            >
              <span className={classes.smallText}>Supply Amount</span>{" "}
              <span className={classes.mediumText}>
                Wallet Balance {balance && parseFloat(balance).toFixed(5)}
                <br/>
               
              </span>
            </Box>
            <FormControl variant="outlined">
              <OutlinedInput onChange={(e) => setAmount(e.target.value)} value={amount} type="number"
                endAdornment={
                  <InputAdornment position="end">
                    <span style={{ marginRight: "15px", textAlign: "end" }}>
                      {supplyData?.coinName} <br /> -$0.00
                    </span>
                    <Button variant="contained">MAX</Button>
                  </InputAdornment>
                }
                labelWidth={0}
                placeholder="$0.00"
              />
              
              {balance==0 && web3 &&
                <Box variant="body"  sx={{color:"red",marginTop:"4px"}}>Insufficient balance</Box>
              }
              {!web3 &&
                <Box variant="body"  sx={{color:"#FF9142",marginTop:"4px"}}>Please connect your wallet</Box>
              }

            </FormControl>

            {/*
          
            <Box mt={5} mb={"4px"}>
            <span className={classes.smallText}>Lend Duration</span>
          </Box>
          <FormControl variant="outlined">
            <Select value={age} onChange={handleChange}>
              <MenuItem value={10}>3 months {"{3.91% interest}"}</MenuItem>
              <MenuItem value={20}>3 months {"{3.91% interest}"}</MenuItem>
              <MenuItem value={30}>3 months {"{3.91% interest}"}</MenuItem>
            </Select>
          </FormControl>
          */}
            <Box mt={5} className={classes.summryMainBox}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"end"}
              >
                <Typography variant="h5">Supply Stats</Typography>
                <MdOutlineKeyboardArrowDown color="#fff" fontSize={"24px"} />
              </Box>
              <Box
                mt={3}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"end"}
              >
                <span className={classes.smallText}>Supply APY:</span>
                <span className={classes.mediumText}>{supplyData?.SupplYAPY}%</span>
              </Box>
              <Box
                mt={2}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"end"}
              >
                <span className={classes.smallText}>Supply Balance:</span>
                <span className={classes.mediumText}>${supplyData?.WalletBalnce}</span>
              </Box>
              <Box
                mt={2}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"end"}
              >
                <span className={classes.smallText}>Reward APR:</span>
                <span className={classes.mediumText}>{supplyData?.supplyAPR}</span>
              </Box>
              <Box mt={3}>
                <Typography variant="h5">Borrow Limit</Typography>
              </Box>
              <Box
                mt={3}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"end"}
              >
                <span className={classes.smallText}>Your Borrow Limit:</span>
                <span className={classes.mediumText}>${userDetails?.borrowLimit}</span>
              </Box>
              <Box
                mt={3}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"end"}
              >
                <span className={classes.smallText}>Borrow Limit Used:</span>
                <span className={classes.mediumText}>{userDetails?.totalBorrow}</span>
              </Box>
            </Box>
            <Box textAlign={"center"} mt={5}>
              <Button disabled={!amount  || isLoading} variant="contained" style={{ minWidth: "170px" }} onClick={() => getSupplyToken()}>Supply &nbsp;  {isLoading && <CircularProgress style={{width:"20px",height:"20px"}} color="primary"  />}</Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default SupplyDialogBox;
