import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
// import trustModule from "@web3-onboard/trust";
import walletLinkModule from "@web3-onboard/walletlink";

import ConnectWallet from "./ConnectWallet";
import phantomModule from '@web3-onboard/phantom'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./DashboardLayout/Dashboard";
import OverviewPage from "./Pages/OverviewPage";
import Landing from "./Pages/Landing";
import PortFolio from "./Pages/PortFolio";
import Swap from "./Pages/Swap";
import Claim from "./Pages/Claim";
import "./App.css"
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "./theme";
import { useContext } from "react";
import SettingsContext from "./Context/SettingsContext";

const injected = injectedModule();
const phantom = phantomModule()
const walletLink = walletLinkModule();
const walletConnect = walletConnectModule({
  projectId: "d004112209fad2b24ec7b29e3e26d220",
  dappUrl: "https://cnwc6l.csb.app/",
  version: 2
});
// const trust = trustModule();

const wallets = [injected, phantom, walletConnect, walletLink];

const chains = [
  {
    id: "0xA0C71FD",
    token: "ETH",
    namespace: "evm",
    label: "Blast Testnet",
    rpcUrl: "https://sepolia.blast.io"
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
  theme: "dark",
  connect: { showSidebar: false },
});

function App() {
  const themeSeeting = useContext(SettingsContext);
  const theme = createTheme({
    theme: themeSeeting.settings.theme,
  });
  return (
    <ThemeProvider theme={theme}>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={LandingPage} exact />
            <Route
              path="/overview"
              render={() => (
                <Dashboard>
                  <OverviewPage />
                </Dashboard>
              )}
              exact
            />
            <Route
              path="/lending"
              render={() => (
                <Dashboard>
                  <Landing />
                </Dashboard>
              )}
              exact
            />
            <Route
              path="/portfolio"
              render={() => (
                <Dashboard>
                  <PortFolio />
                </Dashboard>
              )}
              exact
            />
            <Route
              path="/swap"
              render={() => (
                <Dashboard>
                  <Swap />
                </Dashboard>
              )}
              exact
            />
            <Route
              path="/claim"
              render={() => (
                <Dashboard>
                  <Claim />
                </Dashboard>
              )}
              exact
            />
          </Switch>



        </BrowserRouter>
      </Web3OnboardProvider>
    </ThemeProvider>
  );
}

export default App;
