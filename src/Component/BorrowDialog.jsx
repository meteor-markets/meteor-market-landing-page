import React, { useState } from 'react'
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
  MenuItem
} from '@material-ui/core'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { withdrawCoins } from '../APIconfig/ApiEndPoint'

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

function BorrowDialogBox({ open, handleClose,supplyData,FetchCoin }) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const balance = useSelector(state => state.walletDeatils.currentbalance);
  const walletData = useSelector(state => state.walletDeatils.walletData);
  const web3 = useSelector(state => state.walletDeatils.web3);


  const handleSypplyCoin = async  (address,transactionHash) => {
    let data = {
      coinId: supplyData?._id,
      walletAddress: address,
      amount: amount,
      "transactionHash": transactionHash,
      "transactionStatus": "SUCCESS",
    }
      const response = await withdrawCoins(data)
      console.log("response", response);
      if (response?.responseCode == 200) {
        toast.success(response?.responseMessage)
        handleClose()
        FetchCoin()
        setAmount("")
      } else {
        toast.error(response)
      }
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
              const contract1 = await new web3.eth.Contract(tokenABI, cToken)
              console.log("contract",contract,contract1);

              const amountInWei = web3.utils.toWei(amount, "ether");
              let result = await contract.methods.withdraw(cToken,amountInWei).send({ from: walletData?.address })
              balance = await web3.eth.getBalance(result?.from);
               balanceInEther = web3.utils.fromWei(balance, 'ether');
              // console.log("contract",contract,contract1);
              // // let tokenApprove = await contract1.methods.approve(mainContractAddress,amountInWei).send({ from: walletData?.address })
              // // console.log("tokenApprove",tokenApprove);
              // let result = await contract.methods.repay(cToken,amountInWeiRepay).send({ from: walletData?.address })
              // balance = await web3.eth.getBalance(result?.from);
              //  balanceInEther = web3.utils.fromWei(balance, 'ether');

              // const amountInWei = web3.utils.toWei(amount, "ether");
              // console.log("contract",contract);
              // // let tokenApprove = contract1.methods.approve
              // let result = await contract.methods.borrow(amountInWei,cToken,1710688400).send({ from: walletData?.address })
              // balance = await web3.eth.getBalance(result?.from);
              //  balanceInEther = web3.utils.fromWei(balance, 'ether');
  
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

  const [age, setAge] = useState(10)

  const handleChange = (event) => {
    setAge(event.target.value)
  }

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
          <Typography variant='h4'>Borrow DAI</Typography>
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
            src='../images/DAI-logo1.png'
          />
        </DialogActions>
        <DialogContent className={classes.DialogContent}>
          <form>
            <Box mt={4} display={'flex'} justifyContent={'space-between'} alignItems={'end'} mb={'4px'}>
              <span className={classes.smallText}>Borrow Amount</span> <span className={classes.mediumText}>Borrow Limit 0.0000 DAI</span>
            </Box>
            <FormControl variant='outlined'>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position='end'>
                    <span style={{ marginRight: '15px', textAlign: 'end' }}>
                      DAI <br /> -$0.00
                    </span>
                    <Button variant='contained'>MAX</Button>
                  </InputAdornment>
                }
                labelWidth={0}
                placeholder='$0.00'
              />
            </FormControl>

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
            <Box mt={5} className={classes.summryMainBox}>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'end'}>
                <Typography variant='h5'>Borrow Stats</Typography>
                <MdOutlineKeyboardArrowDown color='#fff' fontSize={'24px'} />
              </Box>
              <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'end'}>
                <span className={classes.smallText}>Borrow APY:</span>
                <span className={classes.mediumText}>0.18%</span>
              </Box>
              <Box mt={2} display={'flex'} justifyContent={'space-between'} alignItems={'end'}>
                <span className={classes.smallText}>Borrow Balance:</span>
                <span className={classes.mediumText}>$45</span>
              </Box>
              <Box mt={3}>
                <Typography variant='h5'>Borrow Limit</Typography>
              </Box>
              <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'end'}>
                <span className={classes.smallText}>Your Borrow Limit:</span>
                <span className={classes.mediumText}>$0 {'->'} $0.00</span>
              </Box>
              <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'end'}>
                <span className={classes.smallText}>Borrow Limit Used:</span>
                <span className={classes.mediumText}>{'0% -> 0%'}</span>
              </Box>
            </Box>
            <Box textAlign={'center'} mt={5}>
              <Button variant='contained' style={{ minWidth: '170px' }}>
                Borrow
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default BorrowDialogBox
