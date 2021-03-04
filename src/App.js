// //MC+YIiP2NyRTz5JmJufkiPyx5ucF5j/H

import { React } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { indigo, pink } from "@material-ui/core/colors";
import GlobalProvider from "./contexts/GlobalState";
import { useState } from "react";
import Client from "./components/clients/Client";
import Agence from "./components/agence/Agence";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import BottomNavbar from "./components/common/BottomNavbar";
import Compte from "./components/compte/Compte";
import AgenceProvider from "./contexts/AgenceState";
import ClientProvider from "./contexts/ClientState";
import CompteProvider from "./contexts/CompteState";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 0),
    height: 30,
    minHeight: 15,
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
  },
  content: {
    // flexGrow: 1,
    // padding: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

export default function App() {
  const classes = useStyles();
  const [darkMode, setDarkMode] = useState(true);
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Roboto",
      fontSize: "12",
    },
    palette: {
      primary: {
        main: pink[500],
        dark: pink[900],
        light: pink[300],
      },
      secondary: {
        main: indigo[500],
        dark: indigo[900],
        light: indigo[300],
      },
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Navbar
            title={`SUNUBANK - ${process.env.REACT_APP_BACKEND_URL}`}
            darkMode={darkMode}
            setDarkMode={() => setDarkMode(!darkMode)}
          />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route
                path="/agences"
                render={() => (
                  <AgenceProvider>
                    <Agence />
                  </AgenceProvider>
                )}
              />

              <Route
                path="/clients"
                render={() => (
                  <ClientProvider>
                    <Client />
                  </ClientProvider>
                )}
              />

              <Route
                path="/comptes"
                render={() => (
                  <CompteProvider>
                    <AgenceProvider>
                      <ClientProvider>
                        <Compte />
                      </ClientProvider>
                    </AgenceProvider>
                  </CompteProvider>
                )}
              />

              <Route exact path="/">
                <Redirect to="/agences" />
              </Route>
            </Switch>
          </main>
          <BottomNavbar />
        </BrowserRouter>
      </ThemeProvider>
    </GlobalProvider>
  );
}
