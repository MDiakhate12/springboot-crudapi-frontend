// //MC+YIiP2NyRTz5JmJufkiPyx5ucF5j/H

import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { indigo, pink } from "@material-ui/core/colors";
import GlobalProvider, { GlobalContext } from "./contexts/GlobalState";
import { useState } from "react";
import Client from "./components/clients/Client";
import Agence from "./components/agence/Agence";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import BottomNavbar from "./components/common/BottomNavbar";
import Compte from "./components/compte/Compte";


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
    flexGrow: 1,
    // padding: theme.spacing(1),
  },
  bottomNavRoot: {
    position: "absolute",
    bottom: "0px",
    width: "100%",
    backgroundColor: pink,
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
            title="SUNUBANK"
            darkMode={darkMode}
            setDarkMode={() => setDarkMode(!darkMode)}
          />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path="/agences" component={Agence} />
              <Route path="/clients" component={Client} />
              <Route path="/comptes" component={Compte}/>
              <Route exact path="/">
                <Redirect to="/agences" />
              </Route>
            </Switch>
            {/* <Agence /> */}
            {/* <Client /> */}
          </main>
          <BottomNavbar />
        </BrowserRouter>
      </ThemeProvider>
    </GlobalProvider>
  );
}
