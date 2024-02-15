import React, { Suspense, Fragment, useContext } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { routes } from "src/routes";
import { createBrowserHistory } from "history";
import PageLoading from "src/component/PageLoading";
import SettingsContext from "src/context/SettingsContext";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "src/theme";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const history = createBrowserHistory();

function App() {
  const themeSeeting = useContext(SettingsContext);
  const theme = createTheme({
    theme: themeSeeting.settings.theme,
  });
  return (
    <div className="App">
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Router history={history}>
              <RenderRoutes data={routes} />
            </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

function RenderRoutes(props) {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {props.data.map((route, i) => {
          const Component = route.component;
          const Layout = route.layout || Fragment;
          return (
            <Route
              exact={route.exact}
              key={i}
              path={route.path}
              render={(props) => (
                  <Layout>
                    {route.routes ? (
                      <RenderRoutes data={route.routes} />
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}
