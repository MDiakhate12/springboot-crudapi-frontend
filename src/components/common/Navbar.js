import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Brightness2, Brightness7 } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import { GlobalContext } from "../../contexts/GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.secondary.dark
        : theme.palette.secondary.main,
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const { currentPage } = useContext(GlobalContext);
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {currentPage}
          </Typography>
          <Tooltip
            title={
              props.darkMode
                ? "Basculer en Mode Clair"
                : "Basculer en Mode Sombre"
            }
          >
            <IconButton onClick={props.setDarkMode}>
              {props.darkMode ? <Brightness7 /> : <Brightness2 />}
            </IconButton>
            {/* <Switch onChange={props.setDarkMode} /> */}
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
