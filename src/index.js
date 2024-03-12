import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
// import trustModule from "@web3-onboard/trust";
import walletLinkModule from "@web3-onboard/walletlink";
import phantomModule from '@web3-onboard/phantom'
import * as serviceWorker from "./serviceWorker";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { store } from './Store/index';
import { Provider } from 'react-redux';



const rootElement = document.getElementById("root");


const injected = injectedModule();
const phantom = phantomModule()
const walletLink = walletLinkModule();
const walletConnect = walletConnectModule({
  projectId: "d004112209fad2b24ec7b29e3e26d220",
  dappUrl: "https://cnwc6l.csb.app/",
  version: 2
});
// const trust = trustModule();

const wallets = [injected,  phantom,walletConnect,walletLink];

const chains = [
  {
    id: "0xA0C71FD",
    token: "ETH",
    namespace: "evm",
    label: "Blast Sepolia",
    rpcUrl: "https://sepolia.blast.io",
  },
  {
    id: "0x1", // chain ID must be in hexadecimel
    token: "ETH", // main chain token
    namespace: "evm",
    label: "Ethereum Mainnet",
    rpcUrl: "https://ropsten.infura.io"
  },
  {
    id: "0x13E31", // chain ID must be in hexadecimel
    token: "ETH", // main chain token
    namespace: "evm",
    label: "Blast",
    rpcUrl: "https://rpc.blast.io"
  },
];

const appMetadata = {
  name: "Connect Wallet Example",
  icon: "<svg>My App Icon</svg>",
  description: "Example showcasing how to connect a wallet.",
  recommendedInjectedWallets: [{ name: "MetaMask", url: "https://metamask.io" }]
};

const web3Onboard = init({
  wallets,
  chains,
  appMetadata,
  theme:"dark",
  connect:{showSidebar:false},
});

ReactDOM.render(
  <StrictMode>

  <Provider store={store}>
  <Web3OnboardProvider web3Onboard={web3Onboard}>
  <App web3Onboard={web3Onboard} />
  <ToastContainer />
</Web3OnboardProvider>
</Provider>

  </StrictMode>,
  rootElement
);
serviceWorker.unregister();
