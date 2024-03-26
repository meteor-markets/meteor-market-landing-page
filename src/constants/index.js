import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
// import trustModule from "@web3-onboard/trust";
import walletLinkModule from "@web3-onboard/walletlink";
import phantomModule from '@web3-onboard/phantom'
import { addAllBalance, addLendingPageCoinDetails, findUserDetails } from "../Store/walletSlice";
import blastdexABI  from '../ABI/blastdexABI.json'

const injected = injectedModule();
const phantom = phantomModule()
const walletLink = walletLinkModule();
const walletConnect = walletConnectModule({
  projectId: "d004112209fad2b24ec7b29e3e26d220",
  dappUrl: "https://cnwc6l.csb.app/",
  version: 2
});
// const trust = trustModule();

export const rpcURLTestnet = "https://sepolia.blast.io"
export const rpcURLMainnet = "https://rpc.blast.io"


export const chainsCoin = [
    {
        id: "0xA0C71FD",
        token: "ETH",
        namespace: "evm",
        label: "Blast Sepolia",
        rpcUrl: rpcURLTestnet,
    },
    // {
    //   id: "0x1", // chain ID must be in hexadecimel
    //   token: "ETH", // main chain token
    //   namespace: "evm",
    //   label: "Ethereum Mainnet",
    //   rpcUrl: "https://ropsten.infura.io"
    // },
    {
        id: "0x13E31", // chain ID must be in hexadecimel
        token: "ETH", // main chain token
        namespace: "evm",
        label: "Blast",
        rpcUrl: rpcURLMainnet
    },
];
export const appMetadata = {
    name: "Connect Wallet Example",
    icon: "<svg>My App Icon</svg>",
    description: "Example showcasing how to connect a wallet.",
    recommendedInjectedWallets: [{ name: "MetaMask", url: "https://metamask.io" }]
};
export const wallets = [injected, phantom, walletConnect, walletLink];


export const defaultChainID = 168587773 // blast testnet
export const mainnetChainID = 81457 // blast mainnet
export const mainContractAddress = "0x349C639a457A4925CDb665F2470B576640fae911"
export const blastCToken = "0xE52EEBDc23c57Cde354AC600FaC78C106f330b44" // blast
export const wethCToken = "0x23Fb0fbE396629D093DE32Fd15938CAdA5Ec332A" // weth
export const usdbCToken = "0x92D48862efA0fC224a3Cf42Ea559DF6ce0fD0386" // usdb





// fetch SuupplyAnd borrow 
export const fetchData = async () => {
    try {
      const response = await fetch('https://v3-api.compound.finance/market/mainnet/0xc3d688B66703497DAA19211EEdff47f25384cdc3/summary');
      const jsonData = await response.json();
      console.log("jsonData",jsonData);
      return jsonData
      // setLoading(false);
    } catch (error) {
        return error
      console.error('Error fetching data:', error);
      // setLoading(false);
    }
  };


  export   const fetchTotalSupplied = async (blastdexABI,walletData ,web3,dispatch) => {
    if (web3) {
      console.log("result");

      const contract = await new web3.eth.Contract(blastdexABI, mainContractAddress)
      console.log("result",contract,walletData);

      let result = await contract.methods.userDetails(walletData?.address?walletData?.address:walletData).call()
      console.log("result",result);
      const borrowLimit = web3.utils.fromWei(result?.borrowLimit, 'ether');
      const totalAsset = web3.utils.fromWei(result?.totalAsset, 'ether');
      const totalSupply = web3.utils.fromWei(result?.totalSupply, 'ether');
      const totalBorrow = web3.utils.fromWei(result?.totalBorrow, 'ether');
      const borrowdurationBigInt = result?.borrowduration;
      const borrowdurationString = borrowdurationBigInt?.toString();
      let allValue = {
        borrowLimit,
        totalAsset,
        totalAsset,
        totalSupply,
        totalBorrow,
        borrowDurationUnix: borrowdurationString
      }

      dispatch(findUserDetails(allValue))
        //  findUserDetails
        ;
    }
  }
export   const handleConvertToUnix = (dateTime) => {
    const unixTimestamp = Math.floor(new Date(dateTime).getTime() / 1000);
    console.log("unixTimestamp",unixTimestamp);
    return unixTimestamp;
  };
  export const fetchBlastTokenDetails = async (token) => {
    console.log("token",token);
    try {
      const response = await fetch(`https://v3-api.compound.finance/market/base-mainnet/${token}/summary`);
      const jsonData = await response.json();
      console.log("jsonData",jsonData);
      return jsonData
      // setLoading(false);
    } catch (error) {
        return error
      console.error('Error fetching data:', error);
      // setLoading(false);
    }
  };
  export const fetchUSDBTokenDetails = async (token) => {
    console.log("token",token);
    try {
      const response = await fetch(`https://v3-api.compound.finance/market/arbitrum-mainnet/${token}/summary`);
      const jsonData = await response.json();
      console.log("jsonData",jsonData);
      return jsonData
      // setLoading(false);
    } catch (error) {
        return error
      console.error('Error fetching data:', error);
      // setLoading(false);
    }
  };

  export const fetchtokenSupplyValueForBlast = async (web3,dispatch ) => {
      const contract = await new web3.eth.Contract(blastdexABI, mainContractAddress)
      // blast 
      let blastTokenbalence = await contract.methods.getTotalSupply(blastCToken).call()
      const balanceInEther = web3.utils.fromWei(blastTokenbalence, 'ether');
      // weth 
      let wethTokenbalence = await contract.methods.getTotalSupply(wethCToken).call()
      const balanceInEtherweth = web3.utils.fromWei(wethTokenbalence, 'ether');
      // usdb 
      let usdbTokenbalence = await contract.methods.getTotalSupply(usdbCToken).call()
      const balanceInEtherusdb = web3.utils.fromWei(usdbTokenbalence, 'ether');
      let data = {balanceInEther,balanceInEtherweth,balanceInEtherusdb}
      dispatch(addAllBalance({balanceInEther,balanceInEtherweth,balanceInEtherusdb}));

      console.log("result", balanceInEther, balanceInEtherweth, balanceInEtherusdb);
      fetchOverViewForBlast(data,dispatch)


    }
  export   const fetchOverViewForBlast = async (allBalance,dispatch) => {
      // for blast 
      const response = await fetchBlastTokenDetails("0x46e6b214b524310239732D51387075E0e70970bf");
      
      let blastDetails = {liquidity:"280k",borrow_apr:Number(response?.borrow_apr),borrowAPY:0, cToken:blastCToken, SupplYAPY: 0, supplyAPR: Number(response?.supply_apr), WalletBalnce:allBalance?.balanceInEther,coinName:"BLAST",coinImage:"https://res.cloudinary.com/dfd7lapgy/image/upload/v1707322669/nopqvxpprwypanyemk7w.jpg" }
      console.log("response", response,blastDetails,allBalance);
      // for weth 
      let coinImage = "images/wethTokenImage.svg"
      const wethresponse = await fetchBlastTokenDetails("0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf");
      let wethDeatils = {liquidity:"300k",borrow_apr:Number(wethresponse?.borrow_apr),borrowAPY:0,cToken:wethCToken, SupplYAPY: 0, supplyAPR: Number(wethresponse?.supply_apr), WalletBalnce:allBalance?.balanceInEtherweth,coinName:"WETH",coinImage:coinImage }
       // for usdb 
       let coinUSDBImage = "images/usdb.svg"
       const usbresponse = await fetchUSDBTokenDetails("0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA");
      //  console.log("usbresponse",usbresponse,usbresponse,wethresponse);
       let usbDeatils = {liquidity:"300k",borrow_apr:Number(usbresponse?.borrow_apr),borrowAPY:0,cToken:usdbCToken, SupplYAPY: 0, supplyAPR: Number(usbresponse?.supply_apr), WalletBalnce:allBalance?.balanceInEtherusdb,coinName:"USDB",coinImage:coinUSDBImage }
       
      dispatch(addLendingPageCoinDetails([blastDetails,wethDeatils,usbDeatils]));
    };


   export const fetchPortFoliyoDetails = async(web3)=>{
    const contract = await new web3.eth.Contract(blastdexABI, mainContractAddress)
    let result = await contract.methods.getTotalSupply(blastCToken).call()
    console.log("contract",result);


// const response = await
   }