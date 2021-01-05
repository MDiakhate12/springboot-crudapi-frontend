import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AgenceFormDialog(props) {
  const [agence, setAgence] = useState(
    props.agence || { nom: "", addresse: "", telephone: "" }
  );

  return (
    <Dialog
      open={props.open}
      onClose={(event, reason) => props.handleClose(event, reason, agence)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{props.currentPage}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="nom"
          label="Nom Agence"
          type="text"
          value={agence.nom}
          onChange={(e) => setAgence({ ...agence, nom: e.target.value })}
          color="secondary"
          fullWidth
        />
        <TextField
          id="adresse"
          label="Addresse"
          type="text"
          value={agence.addresse}
          onChange={(e) => setAgence({ ...agence, addresse: e.target.value })}
          fullWidth
          color="secondary"
        />
        <TextField
          id="telephone"
          label="Téléphone"
          type="phone"
          value={agence.telephone}
          onChange={(e) => setAgence({ ...agence, telephone: e.target.value })}
          fullWidth
          color="secondary"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(event, reason) => props.handleClose(event, reason, agence)}
          color="primary"
        >
          Annuler
        </Button>
        <Button
          onClick={(event, reason) => props.handleClose(event, reason, agence)}
          color="secondary"
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
