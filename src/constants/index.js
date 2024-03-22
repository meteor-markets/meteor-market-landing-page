import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
// import trustModule from "@web3-onboard/trust";
import walletLinkModule from "@web3-onboard/walletlink";
import phantomModule from '@web3-onboard/phantom'

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


