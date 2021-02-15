import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ClientContext } from "../../contexts/ClientState";
import { AgenceContext } from "../../contexts/AgenceState";
import { GlobalContext } from "../../contexts/GlobalState";

export default function CompteFormDialog(props) {
  const { clients } = useContext(ClientContext);
  const { agences } = useContext(AgenceContext);

  const { compteDialog, openCompteDialog, closeCompteDialog } = useContext(
    GlobalContext
  );

  const [compte, setCompte] = useState();

  return (
    <Dialog
      open={compteDialog.open}
      onClose={closeCompteDialog}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{props.currentPage}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          id="solde"
          label="Solde"
          type="number"
          value={compteDialog.compte?.solde || ""}
          onChange={(e) => setCompte({ ...compte, solde: e.target.value })}
          color="secondary"
          fullWidth
        />
        <TextField
          required
          id="decouvert"
          label="Découvert"
          type="number"
          value={compteDialog.compte?.decouvert || ""}
          onChange={(e) => {
            setCompte({ ...compte, decouvert: e.target.value });
          }}
          fullWidth
          color="secondary"
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Agence</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={compteDialog.compte?.agence?.id || ""}
            name="select-agence"
            onChange={async (e) => {
              await setCompte({ ...compte, agence: e.target.value });
              // console.log(props.compte);
              // console.log(compte);
              // console.log(e.target.value);
            }}
          >
            {agences.map((agence) => (
              <MenuItem key={agence.id} value={agence.id}>
                {agence.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Client</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={compteDialog.compte?.client?.id || ""}
            name="select-client"
            onChange={(e) => {
              setCompte({ ...compte, client: e.target.value });
              console.log(compte);
              console.log(props.compte);
              // console.log(e.target.value);
            }}
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {`${client.prenom} ${client.nom}`}
              </MenuItem>
            ))}{" "}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeCompteDialog} color="primary">
          Annuler
        </Button>
        <Button
          onClick={(event, reason) => {
            if (compte.solde === "" || compte.decouvert === "") {
              return;
            }

            console.log("FROM DIALOG CLICK", compte);
          }}
          color="secondary"
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
