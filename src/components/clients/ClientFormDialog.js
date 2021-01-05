import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function ClientFormDialog(props) {
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [client, setClient] = useState(
    props.client || {
      prenom: "",
      nom: "",
      dateNaissance: "",
    }
  );

  useEffect(() => {
    setClient({
      ...client,
      dateNaissance: selectedDate.toISOString().split("T")[0],
    });
  }, []);

  const handleDateChange = (date) => {
    try {
      setSelectedDate(date);
      setClient({
        ...client,
        dateNaissance: date.toISOString().split("T")[0],
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog
      open={props.open}
      onClose={(event, reason) => props.handleClose(event, reason, client)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{props.currentPage}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          id="prenom"
          label="Prénom"
          type="text"
          value={client.prenom}
          onChange={(e) => setClient({ ...client, prenom: e.target.value })}
          color="secondary"
          fullWidth
        />
        <TextField
          required
          id="nom"
          label="Nom"
          type="text"
          value={client.nom}
          onChange={(e) => setClient({ ...client, nom: e.target.value })}
          fullWidth
          color="secondary"
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date de naissance"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            // DialogProps={{
            //   // fullScreen:true,
            //   // fullWidth:true
            // }}
            // onClose={}
            fullWidth
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(event, reason) => props.handleClose(event, reason, client)}
          color="primary"
        >
          Annuler
        </Button>
        <Button
          onClick={(event, reason) => {
            if (client.prenom === "" || client.nom === "") {

              return;
            }
            props.handleClose(event, reason, client);
          }}
          color="secondary"
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
