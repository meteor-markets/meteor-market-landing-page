import ReactDOM from "react-dom";
import App from "./App";
import { Web3OnboardProvider, init } from "@web3-onboard/react";
import * as serviceWorker from "./serviceWorker";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { store } from './Store/index';
import { Provider } from 'react-redux';
import { appMetadata, chainsCoin, wallets } from "./constants";


const web3Onboard = init({
  wallets,
  chains: chainsCoin,
  appMetadata,
  theme: "dark",
  connect: { showSidebar: false },
});


const rootElement = document.getElementById("root");
ReactDOM.render(

  <Provider store={store}>
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <App web3Onboard={web3Onboard} />
      <ToastContainer />
    </Web3OnboardProvider>
  </Provider>,
  rootElement
);
serviceWorker.unregister();
