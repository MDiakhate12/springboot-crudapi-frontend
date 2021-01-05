import React, { useContext, useReducer } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import CompteFormDialog from "./CompteFormDialog";
import { GlobalContext } from "../../contexts/GlobalState";
import { ConfirmationDialog } from "../common/ConfirmationDialog";

const initialState = {
  compteDialogOpen: false,
  confirmationDialogOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "COMPTE_DIALOG_OPEN":
      return {
        ...state,
        compteDialogOpen: true,
      };
    case "COMPTE_DIALOG_CLOSE":
      return {
        ...state,
        compteDialogOpen: false,
        compte: action.payload,
      };
    case "CONFIRMATION_DIALOG_OPEN":
      return {
        ...state,
        confirmationDialogOpen: true,
      };
    case "CONFIRMATION_DIALOG_CLOSE":
      if (action.payload === state.compte) {
        return {
          ...state,
          confirmationDialogOpen: false,
          compte: action.payload,
        };
      } else {
        return {
          ...state,
          confirmationDialogOpen: false,
        };
      }
    default:
      return state;
  }
};

export default function CompteRow(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updateCompte, deleteCompte, openSnackbar } = useContext(GlobalContext);

  const openCompteDialog = () =>
    dispatch({
      type: "COMPTE_DIALOG_OPEN",
    });

  const closeCompteDialog = (event, reason, compte) => {
    if (
      event.target.innerText.toLowerCase() === "enregistrer" &&
      compte !== props.compte
    ) {
      console.log(compte);
      dispatch({ type: "COMPTE_DIALOG_CLOSE", payload: compte });
      updateCompte(compte);
      openSnackbar("Compte modifié avecs succés!", "info")
    } else {
      dispatch({ type: "COMPTE_DIALOG_CLOSE" });
    }
  };

  const openConfirmationDialog = () => {
    dispatch({
      type: "CONFIRMATION_DIALOG_OPEN",
    });
  };
  const closeConfirmationDialog = (event, reason) => {
    // console.log(event.target.innerText.toLowerCase());
    if (event.target.innerText.toLowerCase() === "oui") {
      dispatch({
        type: "CONFIRMATION_DIALOG_CLOSE",
        payload: props.compte.id,
      });
      deleteCompte(props.compte.id);
      openSnackbar("Compte supprimé avec succés!", "warning");
    } else {
      dispatch({
        type: "CONFIRMATION_DIALOG_CLOSE",
      });
    }
  };

  return (
    <>
    <TableRow key={props.compte.id} hover>
      <TableCell component="th" scope="compte">
        {props.compte.id}
      </TableCell>
      <TableCell align="left">{props.compte.solde}</TableCell>
      <TableCell align="left">{props.compte.decouvert}</TableCell>

      <TableCell align="left">{props.compte.agence.nom}</TableCell>
      <TableCell align="left">{`${props.compte.client.prenom} ${props.compte.client.nom}`}</TableCell>
      <TableCell align="center">
        <IconButton
          variant="outlined"
          color="secondary"
          onClick={openCompteDialog}
        >
          <Edit />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <IconButton
          variant="outlined"
          color="primary"
          onClick={openConfirmationDialog}
        >
          <Delete />
        </IconButton>
      </TableCell>
      <CompteFormDialog
        open={state.compteDialogOpen}
        compte={props.compte}
        handleClose={closeCompteDialog}
        currentPage="Modifier Compte"
      />
      <ConfirmationDialog
        open={state.confirmationDialogOpen}
        handleClickOpen={openConfirmationDialog}
        handleClose={closeConfirmationDialog}
        actionTitle="Supprimer Compte"
        actionLabel="supprimer le compte"
      />
    </TableRow>
    </>
  );
}
