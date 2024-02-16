// import { default_RPC_URL } from "src/constants";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { BinanceConnector } from "@bscswap/binance-connector";
export const injected = new InjectedConnector({
  supportedChainIds: [168587773,1, 3, 4, 5, 42, 56, 97],
});

export const binanceinjected = new BinanceConnector({
  supportedChainIds: [1,168587773, 42, 56, 97],
});
const NETWORK_URL = "https://rinkeby.infura.io/v3/1bc80444349c4cac8999fda14cab6b67"; // process.env.REACT_APP_NETWORK_URL
export const walletconnect = new WalletConnectConnector({
  rpc: {
    42: NETWORK_URL,
  },
  // bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 15000,
});

export const SUPPORTED_WALLETS = [
  {
    name: "METAMASK",
    data: {
      connector: injected,
      name: "MetaMask",
      iconName: "/images/metamaskW.png",
      description: "Easy-to-use browser extension.",
      href: null,
      color: "#E8831D",
    },
  },
  {
    name: "Wallet Connect",
    data: {
      connector: walletconnect,
      name: "Wallet Connect",
      iconName: "/images/walletconnectW.png",
      description: "Easy-to-use browser extension.",
      href: null,
      color: "#E8831D",
    },
  },
  
  {
    name: "PHANTOM",
    data: {
      connector: injected,
      name: "Phantom Wallet",
      iconName: "/images/phantom.svg", 
      description: "Solana-based crypto wallet",
      href: null,
      color: "#347eff",
    },
  },
  {
    name: "COINBASE",
    data: {
      connector: injected,
      name: "Coinbase Wallet",
      iconName: "/images/coinbaseW.png",
      description: "The easy way to buy, use, and accept cryptocurrency",
      href: null,
      color: "#0055FF",
    },},
 
];

