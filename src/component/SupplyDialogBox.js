import React, { useState } from "react";
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
} from "@material-ui/core";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { supplyCoins } from "src/APIconfig/ApiEndPoint";

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
  dialogAction:{
    justifyContent: "start",
    paddingLeft: "24px",
    paddingRight: "24px",
  },
  DialogContent:{
    paddingLeft: "24px",
    paddingRight: "24px",
    [theme.breakpoints.down("xs")]:{
      paddingLeft: "0px",
      paddingRight: "0px",
    }
  }
}));

function SupplyDialogBox({ open, handleClose ,supplyData}) {
  const classes = useStyles();

  const [age, setAge] = useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleSypplyCoin = async () => {
    let data={
      coinName:supplyData?.coinName,
      walletAddress:"0xB72c3642EA32deFDA74C68FAe6e6095B49441444",
      amount:0.1,
      transactionDetails:"",


    }
    const response = await supplyCoins(data)
    if (response?.length > 0) {

      // setCoinName(response)
    }
  }
 
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
                Wallet Balance 112.900 {supplyData?.coinName}
              </span>
            </Box>
            <FormControl variant="outlined">
              <OutlinedInput
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
                <span className={classes.mediumText}>{supplyData?.supplyAPY}%</span>
              </Box>
              <Box
                mt={2}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"end"}
              >
                <span className={classes.smallText}>Supply Balance:</span>
                <span className={classes.mediumText}>${supplyData?.sRewardAPR}</span>
              </Box>
              <Box
                mt={2}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"end"}
              >
                <span className={classes.smallText}>Reward APR:</span>
                <span className={classes.mediumText}>{supplyData?.sRewardAPR}%</span>
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
                <span className={classes.mediumText}>$0 {"->"} $0.00</span>
              </Box>
              <Box
                mt={3}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"end"}
              >
                <span className={classes.smallText}>Borrow Limit Used:</span>
                <span className={classes.mediumText}>{"0% -> 0%"}</span>
              </Box>
            </Box>
            <Box textAlign={"center"} mt={5}>
              <Button variant="contained" style={{minWidth:"170px"}} onClick={()=>handleSypplyCoin()}>Supply</Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default SupplyDialogBox;
