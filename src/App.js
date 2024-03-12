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


function App() {
  const themeSeeting = useContext(SettingsContext);
  const theme = createTheme({
    theme: themeSeeting.settings.theme,
  });
  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={LandingPage} exact />
            <Route
              path="/overview"
              render={() => (
                <Dashboard>
                  <OverviewPage  />
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
    </ThemeProvider>
  );
}

export default App;
