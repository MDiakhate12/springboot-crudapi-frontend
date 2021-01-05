import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export function ConfirmationDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={(event) => props.handleClose(event)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.actionTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Voulez vous vraiment ${props.actionLabel}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(event) => props.handleClose(event)} color="primary" autoFocus>
            Non
          </Button>
          <Button onClick={(event) => props.handleClose(event)} color="secondary">
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
