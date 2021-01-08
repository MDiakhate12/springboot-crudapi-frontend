import React, { useContext, useEffect, useState } from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { pink } from "@material-ui/core/colors";
import { GlobalContext } from "../../contexts/GlobalState";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },

  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: pink,
  },
}));

function BottomNavbar(props) {
  const classes = useStyles();

  const [value, setValue] = useState(1);

  const { setCurrentPage } = useContext(GlobalContext);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/clients":
        setValue(0);
        break;
      case "/agences":
        setValue(1);
        break;
      case "/comptes":
        setValue(2);
        break;

      default:
        break;
    }
  }, [location.pathname]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        console.log(location);
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to="/clients"
        label="Clients"
        icon={<PeopleAltIcon />}
        onClick={() => setCurrentPage("Gestion des clients")}
      />
      <BottomNavigationAction
        component={Link}
        to="/agences"
        label="Agences"
        icon={<AccountBalanceIcon />}
        onClick={() => setCurrentPage("Gestion des agences")}
      />
      <BottomNavigationAction
        component={Link}
        to="/comptes"
        label="Comptes"
        icon={<AttachMoneyIcon />}
        onClick={() => setCurrentPage("Gestion des comptes")}
      />
    </BottomNavigation>
  );
}

export default BottomNavbar;
