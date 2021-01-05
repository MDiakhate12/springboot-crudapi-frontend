import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../contexts/GlobalState";

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SuccessSnackbar() {
  const classes = useStyles();
  const { snackOpen, snackTitle, snackSeverity, closeSnackbar } = useContext(
    GlobalContext
  );
  return (
    <div className={classes.root}>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity={snackSeverity}>
          {snackTitle}
        </Alert>
      </Snackbar>
    </div>
  );
}
