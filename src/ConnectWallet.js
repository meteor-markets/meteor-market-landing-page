import React, { useContext, useEffect, useState } from "react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ethers } from "ethers";
import { Box, Button, Typography, makeStyles } from "@material-ui/core";
import { FetchCoinList, FetchOverview, connectWallet, getProfileHandler } from "./APIconfig/ApiEndPoint";
import { FaArrowRight, FaSignOutAlt } from "react-icons/fa";
import { sortAddress } from "./utils";
import CopyToClipboard from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useDispatch, useSelector } from "react-redux";
import { addBalllance, addOverviewDetails, addWalletDetails, addWeb3 } from "./Store/walletSlice";
import { IoCloseSharp } from "react-icons/io5";
import Web3 from "web3";
import { toast } from "react-toastify";

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
  desktopDrawer: {
    maxWidth: "200px"
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


const networkMap = [{ networkName: "Blast Testnet", id: 168587773 },
{ networkName: "Blast Mainnet", id: 81457 },
  // {networkName:"Ethereum Mainnet",id:1}
];
const ConnectWallet = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [CoinName, setCoinName] = useState();
  const [rightBar, setRightBar] = useState(false);
  const [openChangeWallet, setOpenChangeWallet] = React.useState(null);
  const walletData = useSelector(state => state.walletDeatils.walletData);
  const balance = useSelector(state => state.walletDeatils.currentbalance);
  const web3 = useSelector(state => state.walletDeatils.web3);


  
  let showExploral = walletData?.chainId ==81457?"https://blastscan.io/address/":"https://sepolia.blastscan.io/address/"
  const handleClick = (event) => {
    setOpenChangeWallet(event.currentTarget);
  };
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
 
  const [
    {
      chains, connectedChain, settingChain }, setChain] = useSetChain()
  console.log("chains",balance, chains, connectedChain);

  const [
    ethersProvider,
    setProvider
  ] = useState();
  const [account, setAccount] = useState(null);
  console.log("walletData", ethersProvider);
  useEffect(() => {
    if (wallet?.provider) {
      const web3Instance = new Web3(wallet.provider); // Initialize Web3 with the provider from the connected wallet
      dispatch(addWeb3(web3Instance))
      let chainId = Number(wallet?.chains[0].id)
      const { name, avatar } = wallet?.accounts[0].ens ?? {};
      let data =
      {
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url },
        chainId: chainId
      }



      FetchCoin(chainId)
      walletConect(wallet.accounts[0].address)
      localStorage.setItem("walletDetails", JSON.stringify(data))
      sessionStorage.setItem("userAddress", wallet.accounts[0].address)
      dispatch(addWalletDetails(data))
      setAccount(data);
    }
  }, [wallet]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (web3) {
        try {
          // Check if MetaMask is installed and has been detected
          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            // If there are accounts available (MetaMask is installed and unlocked), proceed with fetching the balance
            const account = accounts[0]; // Assuming the first account is the current user's
            console.log("account",account);
            // Fetch the balance
            const balance = await web3.eth.getBalance(account);
            // Convert from Wei to Ether
            const balanceInEther = web3.utils.fromWei(balance, 'ether');
            dispatch(addBalllance(balanceInEther))
            
          } else {
            // Handle case where no accounts are available (MetaMask is not installed or unlocked)
            console.log('No accounts available');
          }
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };
  
    fetchBalance();
  }, [web3]);

  // connect wallet api 
  const walletConect = async (address) => {
    const response = await connectWallet(address)
    sessionStorage.setItem("token", response?.token)
    getOverview(response?.token)

  }

  const getOverview = async (token) => {
    const response = await FetchOverview(token)
    if (response?.responseCode === 200) {
      dispatch(addOverviewDetails(response.result[0]))
    }
  }


  useEffect(() => {
    if (wallet?.provider) {
      const library = new ethers.providers.Web3Provider(wallet?.provider);
      console.log("lisbafnabsn",library);
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
    }
  }, [wallet]);




  const FetchCoin = async (chainId) => {
    setCoinName([])
    const response = await FetchCoinList()
    if (response?.length > 0) {
      let filterData = response?.filter((ele) => ele?.chainId == chainId)
      console.log("filterData", filterData);
      setCoinName(filterData[filterData?.length-1])
    }
  }


  const handleDisconnectWallet = () => {
    setAccount(null)
    disconnect({ label: wallet.label })
    sessionStorage.removeItem("userAddress")
    sessionStorage.removeItem("token")
    setRightBar(false)
    dispatch(addWalletDetails({}))
    dispatch(addOverviewDetails({}))
    dispatch(addWeb3(null))
    dispatch(addBalllance(null))
    setCoinName({})

  }
  const switchNetwork = async (newChainId) => {
    console.log("newChainId", newChainId);
    try {
      // Check if the new chainId is in the list of supported chains
      // Set the new chain, and set settingChain to true during the process

      const isChainValid = chains.some((chain) => Number(chain.id) === newChainId);
      console.log("isChainValid", isChainValid);
      if (isChainValid) {
        // Set the new chain
        await setChain({ chainId: newChainId });
        setOpenChangeWallet(false);

      } else {
        console.error(`Chain with chainId: ${newChainId} has not been initialized.`);
      }
    } catch (error) {
      console.error('Error switching network:', error);
    }
  };
  return (
    <div>
      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" pr={2} sx={{ position: "relative" }}>
          {balance &&
            <div>
              {/*
            <img src={CoinName?.coinImage} alt="image" style={{ width: "30px",marginTop:"6px" }} />
            */}
              <img src="https://sepolia.blastscan.io/images/svg/brands/main-light.svg?v=24.2.2.1" alt="image" style={{ width: "30px",marginTop:"6px" }} />

            </div>}
          <Typography style={{
            marginLeft: "5px",
            color: "#fff",
            cursor: "pointer",
          }}>
                      {balance && parseFloat(balance).toFixed(5)}  &nbsp;
            {/*
          <span>{CoinName?.coinName}</span> &nbsp;
          */}
          
            <span>{balance && "ETH"}</span> &nbsp;
{balance &&

  
  <span onClick={handleClick}>{openChangeWallet ? (<KeyboardArrowUpIcon />) : (<KeyboardArrowDownIcon />)}</span>
}
            <div>
              {openChangeWallet &&
                <Box sx={{ "top": "28px", "right": "0px", "width": "200px", "height": "160px", "position": "absolute", "background": "rgb(28, 28, 28)", "borderRadius": "10px", "boxShadow": "rgba(0, 0, 0, 0.1) 0px 4px 12px",border:"1px solid rgb(255 145 66 / 10%)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{ marginTop: "10px" }}><span style={{ padding: "10px", fontSize: "20px" }}>Select Network</span> </Typography>
                    <IoCloseSharp onClick={() => {
                      setOpenChangeWallet(false);
                    }} style={{ fontSize: "18px", cursor: "pointer" }} />
                  </div>

                  <div style={{ borderBottom: "2px solid #eb873f", height: 10 }}></div>
                  <Box>
                    <Typography
                      variant="caption"
                      className="textColorFormate"
                      align="left"
                    >
                      {networkMap?.map((network) => {
                        return (
                          <Button
                            fullWidth
                            disabled={network?.id == walletData?.chainId}
                            className={classes.btnHover}
                            style={{
                              justifyContent: "left",
                              color: "white",
                              textTransform: "capitalize",
                              fontSize: "16px"
                            }}
                            onClick={() => switchNetwork(network?.id)}
                          >
                            <span style={{ "display": "flex", "borderRadius": "50%", "width": "30px", "background": "black", "height": "30px", "justifyContent": "center", "alignItems": "center" }}><img src="https://sepolia.blastscan.io/images/svg/brands/main-light.svg?v=24.2.2.1" width="20" /></span> &nbsp;  &nbsp;{network?.networkName}
                          </Button>
                        )
                      })}
                    </Typography>
                  </Box>
                </Box>
              }
            </div>
          </Typography>
        </Box>

        {account?.address ? (
          <Box sx={{ position: "relative" }}>
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
            
            </Button>
            {rightBar &&
              <Box sx={{ "top": "46px", "right": "0px", "width": "200px", "height": "180px", "position": "absolute", "background": "rgb(28, 28, 28)", "borderRadius": "10px", "boxShadow": "rgba(0, 0, 0, 0.1) 0px 4px 12px",color:"white",border:"1px solid rgb(255 145 66 / 10%)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" sx={{ marginTop: "10px" }}><span style={{ padding: "10px", fontSize: "20px" }}>Expert Mode</span> </Typography>
                  <IoCloseSharp onClick={() => {
                    setRightBar(!rightBar);
                  }} style={{ fontSize: "18px", cursor: "pointer" }} />
                </div>

                <div style={{ borderBottom: "2px solid #eb873f", height: 10 }}></div>
                <Box pt={1}>
                  <CopyToClipboard text={account?.address}>
                    <div className={classes.btnHover}
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        color: "white",
                        textTransform: "capitalize",
                        marginTop: "10px",
                        marginBottom: "10px"
                      }}>

                      <FileCopyIcon
                        style={{
                          marginLeft: "5px",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                        fontSize="small"
                        onClick={() =>{ toast.info("Copied", {
                          position: toast.POSITION.TOP_RIGHT
                        })
                        setRightBar(false)
                      }}
                      />
                      <div>
                        &nbsp;Copy Address
                      </div>
                    </div>
                  </CopyToClipboard>
                 

                  <Button 
                  fullWidth
                  className={classes.btnHover}
                  style={{
                    justifyContent: "left",
                    textTransform: "capitalize",
                  }}
                  onClick={()=>setRightBar(false)}
                >
                <a style={{color:"white",textDecoration:"none"}} href={`${showExploral}${account?.address}`} target="_blank"><FaSignOutAlt color="white" /> &nbsp;View on EXplorer</a>
                  
                </Button  >
                  <Button
                  fullWidth
                  className={classes.btnHover}
                  style={{
                    justifyContent: "left",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                  onClick={() => handleDisconnectWallet()}
                >
                  <FaArrowRight color="white" /> &nbsp;&nbsp;Disconnect
                </Button>
                </Box>
              </Box>
            }
          </Box>
        ) : (
          <Button
            variant="contained"
            className={classes.supplyBtns}
            disabled={connecting} onClick={() => connect()}
          >
            Connect
          </Button>
        )}


        {/*
        <Dialog
        classes={{ paper: classes.desktopDrawer }}
        open={rightBar}
        onClose={() => {
          setRightBar(false);
        }}
      >
        {content}
      </Dialog>
      */}


      </Box>


    </div>
  );
};

export default ConnectWallet;
