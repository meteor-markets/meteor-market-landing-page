import { default_RPC_URL } from "src/constants";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { BinanceConnector } from "@bscswap/binance-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
});

export const binanceinjected = new BinanceConnector({
  supportedChainIds: [1, 42, 56, 97],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    97: default_RPC_URL,
  },
  bridge: "https://bridge.walletconnect.org",
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
    name: "TRUSTWALLET",
    data: {
      connector: injected,
      name: "Trust Wallet",
      iconName: "/images/coinbaseW.png",
      description: "The most trusted & secure crypto wallet",
      href: null,
      color: "#3375BB",
    },
  },
  {
    name: "BINANCE",
    data: {
      connector: binanceinjected,
      name: "Binance Chain",
      iconName: "/images/safepal.png",
      description: "A Crypto Wallet for Binance Smart Chain",
      href: null,
      color: "#F9A825",
    },
  },
];
