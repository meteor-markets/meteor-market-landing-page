import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Button,
  Container,
  InputAdornment,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  NativeSelect,
  InputBase,
  withStyles,
  InputLabel,
} from "@material-ui/core";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { IoSwapVertical } from "react-icons/io5";
import Page from "../Component/Page";
import Footer from "../HomeLayout/Footer";
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
  headBox: {
    border:"1px solid rgba(255, 145, 66, 0.1)",
    borderRadius: "9px",
    background: "#1C1C1C",
    padding: "35px 35px",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 15px",
    },
  },
  numberBox: {
    backgroundColor: "#212123",
    borderRadius: "9px",
    padding: "24px 24px",
    // textAlign: "center",
    border: "1px solid rgba(255, 145, 66, 0.1)",
    width:"10vw",
    margin:"10px",
    // height:"10vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center"
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
}));

const BootstrapInput = withStyles((theme) => ({
  input: {
    // borderR
    // borderLeftRadius: 4,
    position: "relative",
    backgroundColor: "rgb(255, 255, 255, 5%)",
    border: "none",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    // transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      // borderRadius: 4,
      // borderColor: "#80bdff",
      // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

let coinsData = [
  { value: "../images/DAI-logo1.png", label: "DAI" },
  { value: "../images/LUSD-logo1.png", label: "LUSD" },
];

const Swap=()=> {
  const classes = useStyles();
  const [age, setAge] = useState(10);
  const balance = useSelector(state => state.walletDeatils.currentbalance);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Page title="Swap">
      <Box className={classes.headBox}>
        <Box mb={5}>
          <Typography variant="h2" className="textColorFormate">
            Swap
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            Easily swap crypto assets across platforms.
          </Typography>
        </Box>
        <Box style={{display:"flex", justifyContent:"center", width:"100%"}}>
         <Box className={classes.numberBox}>
         <img src="https://sonne.finance/assets/images/velodrome-icon.png" width={50}/> &nbsp;<a style={{textDecoration:"none"}} href=" https://velodrome.finance/swap?from=0x4200000000000000000000000000000000000006&to=eth" target="_blank">
         <Typography variant="h4">Velodrom</Typography></a>
         
         </Box>
         <Box className={classes.numberBox}>
         <img src="https://sonne.finance/assets/images/openocean.png" width={50} /> &nbsp;<a style={{textDecoration:"none"}} href="https://app.openocean.finance/CLASSIC#/BLAST/ETH/USDB" target="_blank">
         <Typography variant="h4">Open Ocean</Typography></a>
         
         </Box>
        </Box>
        <Box style={{display:"flex", justifyContent:"center", width:"100%"}}>
        <Box className={classes.numberBox}>
        <img src="images/firebird.webp" width={50}/> &nbsp;<a style={{textDecoration:"none"}} href="https://app.firebird.finance/swap" target="_blank">
        <Typography variant="h4">Firebird</Typography></a>
        
        </Box>
        <Box className={classes.numberBox}>
        <img src="https://sonne.finance/assets/images/squid.svg" width={50}/><a style={{textDecoration:"none"}} href="https://app.squidrouter.com/?chains=1%2C81457&tokens=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2%2C0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" target="_blank">
        <Typography variant="h4">Bridge on Squid</Typography></a>
        
        </Box>
        </Box>
        </Box>
      <Footer />
    </Page>
  );
}

export default Swap



// <Container maxWidth="sm">
//           <Box className={classes.numberBox}>
//             <Typography variant="h3" className="textColorFormate">
//               Swap
//             </Typography>
//             <form>
//               <Box
//                 mt={4}
//                 display={"flex"}
//                 justifyContent={"space-between"}
//                 alignItems={"end"}
//                 mb={"4px"}
//               >
//                 <span className={classes.smallText}>Supply Amount</span>{" "}
//                 <span className={classes.mediumText}>
//                 Wallet Balance {balance && parseFloat(balance).toFixed(5)}
//                 </span>
//               </Box>

//               <Grid container>
//                 <Grid item xs={8}>
//                   <FormControl>
//                     <BootstrapInput
//                       value={"1.2 ($2813.15)"}
//                       id="demo-customized-textbox"
//                     />
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={4}>
//                   <FormControl>
//                     <NativeSelect
//                       id="demo-customized-select-native"
//                       value={age}
//                       onChange={handleChange}
//                       input={<BootstrapInput />}
//                     >
//                       <option value={10}>DAI</option>
//                       <option value={20}>DAI</option>
//                       <option value={30}>DAI</option>
//                     </NativeSelect>
//                   </FormControl>
//                 </Grid>
//               </Grid>
//               <Box
//                 mt={1}
//                 display={"flex"}
//                 justifyContent={"right"}
//                 alignItems={"end"}
//                 mb={"4px"}
//               >
//                 <Button variant="contained" style={{ marginRight: "20px" }}>
//                   HALF
//                 </Button>
//                 <Button variant="contained">MAX</Button>
//               </Box>

//               <Box textAlign={"center"} my={3}>
//                 <IoSwapVertical fontSize={"3rem"}
//                     style={{ marginRight: "9px",color:"#fff" }}/>
//               </Box>

//               <Box
//                 mt={4}
//                 display={"flex"}
//                 justifyContent={"space-between"}
//                 alignItems={"end"}
//                 mb={"4px"}
//               >
//                 <span className={classes.smallText}>You Receive</span>
//               </Box>

//               <Grid container>
//                 <Grid item xs={8}>
//                   <FormControl>
//                     <BootstrapInput
//                       value={"0.066 ($2812.45)"}
//                       id="demo-customized-textbox"
//                     />
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={4}>
//                   <FormControl>
//                     <NativeSelect
//                       id="demo-customized-select-native"
//                       value={age}
//                       onChange={handleChange}
//                       input={<BootstrapInput />}
//                     >
//                       <option value={10}>DAI</option>
//                       <option value={20}>DAI</option>
//                       <option value={30}>DAI</option>
//                     </NativeSelect>
//                   </FormControl>
//                 </Grid>
//               </Grid>

//               <Box mt={5} className={classes.summryMainBox}>
//                 <Box
//                   display={"flex"}
//                   justifyContent={"space-between"}
//                   alignItems={"end"}
//                 >
//                   <Typography variant="h5">Summary</Typography>
//                   <MdOutlineKeyboardArrowDown color="#fff" fontSize={"24px"} />
//                 </Box>
//                 <Box mt={3} display={"flex"} alignItems={"center"}>
//                   <HiOutlineExclamationCircle
//                     fontSize={"18px"}
//                     style={{ marginRight: "9px" }}
//                     className={classes.smallText}
//                   />
//                   <span className={classes.smallText}>
//                     Price = 15.017 per BTC
//                   </span>
//                 </Box>
//                 <Box mt={3} display={"flex"} alignItems={"center"}>
//                   <HiOutlineExclamationCircle
//                     fontSize={"18px"}
//                     style={{ marginRight: "9px" }}
//                     className={classes.smallText}
//                   />
//                   <span className={classes.smallText}>
//                   Gas Fee = $13.50
//                   </span>
//                 </Box>
//                 <Box mt={3} display={"flex"} alignItems={"center"}>
//                   <HiOutlineExclamationCircle
//                     fontSize={"18px"}
//                     style={{ marginRight: "9px" }}
//                     className={classes.smallText}
//                   />
//                   <span className={classes.smallText}>
//                   Slippage Tolerance = 0.5%
//                   </span>
//                 </Box>
                
//               </Box>
//               <Box textAlign={"center"} mt={5}>
//                 <Button variant="contained" style={{ minWidth: "170px" }}>
//                 Initiate Swap
//                 </Button>
//               </Box>
//             </form>
//           </Box>
//         </Container>