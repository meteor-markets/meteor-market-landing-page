import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
// import trustModule from "@web3-onboard/trust";
import walletLinkModule from "@web3-onboard/walletlink";
import phantomModule from '@web3-onboard/phantom'
import { findUserDetails } from "../Store/walletSlice";

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
export const mainContractAddress = "0x92F10A662C71539e6d476a1966AEB1f855AB4648"
export const cToken = "0x6Ca296c9776659Ec318E0151Fd6b4223ddAaa247" // blast




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
      const contract = await new web3.eth.Contract(blastdexABI, mainContractAddress)
      let result = await contract.methods.userDetails(walletData?.address).call()
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