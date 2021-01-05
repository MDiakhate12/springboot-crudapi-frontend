import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { InputAdornment, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { GlobalContext } from "../../contexts/GlobalState";

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CompteFormDialog(props) {
  const classes = useStyles();

  const { agences, clients } = useContext(GlobalContext);

  const [compte, setCompte] = useState(
    props.compte || {
      solde: 0,
      decouvert: 0,
      agence: agences[0],
      client: clients[0],
    }
  );

  return (
    <Dialog
      open={props.open}
      onClose={(event, reason) => props.handleClose(event, reason, compte)}
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
          value={compte.solde}
          onChange={(e) => setCompte({ ...compte, solde: e.target.value })}
          color="secondary"
          fullWidth
          endAdornment={<InputAdornment position="end">XOF</InputAdornment>}
        />
        <TextField
          required
          id="decouvert"
          label="Découvert"
          type="number"
          value={compte.decouvert}
          onChange={(e) => setCompte({ ...compte, decouvert: e.target.value })}
          fullWidth
          color="secondary"
          endAdornment={<InputAdornment position="end">XOF</InputAdornment>}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Agence</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={compte.agence}
            onChange={(e) => {
              setCompte({ ...compte, agence: e.target.value });
              console.log(compte);
              // console.log(e.target.value);
            }}
          >
            {agences.map((agence) => (
              <MenuItem key={agence.id} value={agence}>
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
            value={compte.client}
            onChange={(e) => {
              setCompte({ ...compte, client: e.target.value });
              console.log(compte);
              // console.log(e.target.value);
            }}
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client}>
                {`${client.prenom} ${client.nom}`}
              </MenuItem>
            ))}{" "}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(event, reason) => props.handleClose(event, reason, compte)}
          color="primary"
        >
          Annuler
        </Button>
        <Button
          onClick={(event, reason) => {
            if (compte.solde === "" || compte.decouvert === "") {
              return;
            }
            props.handleClose(
              event,
              reason,
              compte.agence.id,
              compte.client.id,
              compte
            );
          }}
          color="secondary"
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
