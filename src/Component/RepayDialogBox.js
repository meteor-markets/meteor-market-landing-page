import React, { useEffect, useState } from 'react'
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
  CircularProgress
} from '@material-ui/core'
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { toast } from "react-toastify";
import { supplyCoins } from "../APIconfig/ApiEndPoint";
import { useDispatch, useSelector } from "react-redux";
import blastdexABI from '../ABI/blastdexABI.json'
import Web3 from "web3";
import { useConnectWallet } from "@web3-onboard/react";
import { blastCToken, convertUnixToDateTime, convertValue, fetchTotalSupplied, mainContractAddress } from "../constants";
import { addBalllance } from "../Store/walletSlice";

import tokenABI from '../ABI/tokenABI.json'

const useStyles = makeStyles((theme) => ({
  closeBtn: {
    fontSize: '1.7rem',
    color: '#fff',
    cursor: 'pointer'
  },
  smallText: {
    color: 'rgba(255,255,255,80%)'
  },
  mediumText: {
    color: '#fff'
  },
  summryMainBox: {
    backgroundColor: 'rgb(255, 255, 255, 5%)',
    borderRadius: '9px',
    padding: '20px'
  },
  dialogAction: {
    justifyContent: 'start',
    paddingLeft: '24px',
    paddingRight: '24px'
  },
  DialogContent: {
    paddingLeft: '24px',
    paddingRight: '24px',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0px',
      paddingRight: '0px'
    }
  }
}))

function RepayDialogBox({ open, handleClose,supplyData ,FetchCoin }) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const balance = useSelector(state => state.walletDeatils.currentbalance);
  const web3 = useSelector(state => state.walletDeatils.web3);
  const walletData = useSelector(state => state.walletDeatils.walletData);
  const userDetails = useSelector(state => state.walletDeatils.userDetails);
  const [borrowBalance, setBorrowBalance] = useState()
console.log("borrowBalance",borrowBalance);
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [intrestAmount, setIntrestAmount] = useState()
  const [timeDuration, setTimeDuration] = useState()
  const [remainingTime, setRemainingTime] = useState('');

console.log("remainingTime",remainingTime,timeDuration);

  const handleSypplyCoin = async (address,transactionHash) => {
      toast.success("Repayed Successfully")
      handleClose()
      fetchTotalSupplied(blastdexABI,walletData ,web3,dispatch)
      FetchCoin()
      setAmount("")
      setIsLoading(false)
 
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
            let intrestBalnace = Number(amount)*5/100
            let intresApproveBalance = Number(amount)+intrestBalnace
            setIsLoading(true)
            const contract = await new web3.eth.Contract(blastdexABI, mainContractAddress)
            const contract1 = await new web3.eth.Contract(tokenABI, supplyData?.cToken)
            console.log("contract",contract,intresApproveBalance,intrestBalnace,amount,Number(amount)+Number(intrestBalnace));

            const amountInWei = web3.utils.toWei(amount, "ether");
            const amountInWeiApprove = web3.utils.toWei(intresApproveBalance, "ether");

             let tokenApprove = await contract1.methods.approve(mainContractAddress,amountInWeiApprove).send({ from: walletData?.address })
                // console.log("tokenApprove",tokenApprove);
                let result = await contract.methods.repay(supplyData?.cToken,amountInWei).send({ from: walletData?.address })
                balance = await web3.eth.getBalance(result?.from);
                 balanceInEther = web3.utils.fromWei(balance, 'ether');
            dispatch(addBalllance(balanceInEther))
            if (result) {
              handleSypplyCoin(result?.from,result?.transactionHash)
            }
            console.log("contract", result,balanceInEther);
          
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
  const getBorrowAmount = async()=>{
    if (web3 && userDetails?.borrowDurationUnix) {
      const contract = await new web3.eth.Contract(blastdexABI, mainContractAddress)
    // blast 
    let blastTokenbalence = await contract.methods.getBorrowAmount(blastCToken).call()
    let findBorrowVlue = convertValue(web3,blastTokenbalence)
    setBorrowBalance(findBorrowVlue)
    console.log("userDetails",userDetails);
    let  timeshow = convertUnixToDateTime(userDetails?.borrowDurationUnix)
    if (timeshow) {
      
      setTimeDuration(timeshow)
    }
    console.log("timeshow",timeshow);
    }
  }
  useEffect(()=>{
    if (web3 && userDetails?.borrowDurationUnix) {
      getBorrowAmount()
    }
  },[web3,userDetails?.borrowDurationUnix])
    // State for remaining time
  
    // Function to calculate remaining time
    const calculateRemainingTime = (timeDuration) => {
      const dateTime = new Date(timeDuration); // Assuming theDateTime is in UTC
      const actualTime = new Date(); // Assuming theActualTime is in UTC
      const difference = dateTime - actualTime;
      
      // If the actual time is past the target time, set remaining time to "Time expired"
      if (difference <= 0) {
        setRemainingTime('Time expired');
      } else {
        // Calculate remaining time components
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        
        // Format remaining time
        const formattedTime = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        setRemainingTime(formattedTime);
      }
    };
    useEffect(() => {
      if (timeDuration) {
        
      const interval = setInterval(() => {
        calculateRemainingTime(timeDuration);
      }, 1000);
  
      return () => clearInterval(interval);
    }

    }, [timeDuration]);
  return (
    <Box>
      <Dialog fullWidth open={open} onClose={handleClose} style={{ backgroundColor: '#00000070' }} maxWidth={'md'}>
        <DialogActions className={classes.dialogAction}>
          <FaArrowLeftLong
            className={classes.closeBtn}
            onClick={() => {
              handleClose()
            }}
          />
          <Typography variant='h4'>Repay {supplyData?.coinName}</Typography>
          <img
            alt=''
            style={{
              width: '25px',
              height: '25px',
              borderRadius: '5px',
              objectFit: 'cover',
              marginRight: '15px'
            }}
            width='100%'
            src={supplyData?.coinImage}
          />
        </DialogActions>
        <DialogContent className={classes.DialogContent}>
          <form>
            <Box mt={4} display={'flex'} justifyContent={'space-between'} alignItems={'end'} mb={'4px'}>
              <span className={classes.smallText}>Borrow Amount</span> <span className={classes.mediumText}>Borrow Balance 0.00</span>
            </Box>
            <FormControl variant='outlined'>
              <OutlinedInput
              onChange={(e) =>{ setAmount(e.target.value)
                let intrestBalnace = Number(e.target.value)*5/100
                let intresApproveBalance = Number(e.target.value)+intrestBalnace
                setIntrestAmount(intresApproveBalance)
              }} value={amount} type="number"
                endAdornment={
                  <InputAdornment position='end'>
                    <span style={{ marginRight: '15px', textAlign: 'end' }}>
                    {supplyData?.coinName} <br /> -$0.00
                    </span>
                    <Button variant='contained'>MAX</Button>
                  </InputAdornment>
                }
                labelWidth={0}
                placeholder='$0.00'
              />
              {remainingTime != "Time expired" &&
            <Box sx={{color:"red",marginTop:"4px"}}>
            {remainingTime}</Box>
            }
              {balance==0 && web3 &&
                <Box variant="body"  sx={{color:"red",marginTop:"4px"}}>Insufficient balance</Box>
              }
              {!web3 &&
                <Box variant="body"  sx={{color:"#FF9142",marginTop:"4px"}}>Please connect your wallet</Box>
              }
            </FormControl>

         {/*
        
           <Box mt={5} mb={'4px'}>
              <span className={classes.smallText}>Lend Duration</span>
            </Box>
             <FormControl variant='outlined'>
              <Select value={age} onChange={handleChange}>
                <MenuItem value={10}>3 months {'{3.91% interest}'}</MenuItem>
                <MenuItem value={20}>3 months {'{3.91% interest}'}</MenuItem>
                <MenuItem value={30}>3 months {'{3.91% interest}'}</MenuItem>
              </Select>
            </FormControl>
        */}
           
            <Box mt={5} className={classes.summryMainBox}>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'end'}>
                <Typography variant='h5'>Borrow Stats</Typography>
                <MdOutlineKeyboardArrowDown color='#fff' fontSize={'24px'} />
              </Box>
              <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'end'}>
                <span className={classes.smallText}>Total Amount Adding (5% interest):</span>
                <span className={classes.mediumText}>{intrestAmount}</span>
              </Box>
              <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'end'}>
                <span className={classes.smallText}>Borrow APY:</span>
                <span className={classes.mediumText}>0%</span>
              </Box>
              <Box mt={2} display={'flex'} justifyContent={'space-between'} alignItems={'end'}>
                <span className={classes.smallText}>Borrow Balance:</span>
                <span className={classes.mediumText}>${borrowBalance}</span>
              </Box>
              
              <Box mt={3}>
                <Typography variant='h5'>Borrow Limit</Typography>
              </Box>
              <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'end'}>
                <span className={classes.smallText}>Your Borrow Limit:</span>
                <span className={classes.mediumText}>${userDetails?.borrowLimit}</span>
              </Box>
              <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'end'}>
                <span className={classes.smallText}>Borrow Limit Used:</span>
                <span className={classes.mediumText}>{userDetails?.totalBorrow}</span>
              </Box>
            </Box>
            <Box textAlign={'center'} mt={5}>
            <Button disabled={!amount  || isLoading} variant="contained" style={{ minWidth: "170px" }} onClick={() => getSupplyToken()}>Repay &nbsp;  {isLoading && <CircularProgress style={{width:"20px",height:"20px"}} color="primary"  />}</Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default RepayDialogBox
