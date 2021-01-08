import React, { useContext, useReducer } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { IconButton, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import AgenceFormDialog from "./AgenceFormDialog";
import { GlobalContext } from "../../contexts/GlobalState";
import { ConfirmationDialog } from "../common/ConfirmationDialog";

const initialState = {
  snackOpen: false,
  agenceDialogOpen: false,
  confirmationDialogOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AGENCE_DIALOG_OPEN":
      return {
        ...state,
        agenceDialogOpen: true,
      };
    case "AGENCE_DIALOG_CLOSE":
      return {
        ...state,
        agenceDialogOpen: false,
        agence: action.payload,
      };
    case "CONFIRMATION_DIALOG_OPEN":
      return {
        ...state,
        confirmationDialogOpen: true,
      };
    case "CONFIRMATION_DIALOG_CLOSE":
      if (action.payload === state.agence) {
        return {
          snackOpen: true,
          confirmationDialogOpen: false,
          agence: action.payload,
          ...state,
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

export default function AgenceRow(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updateAgence, deleteAgence, openSnackbar } = useContext(
    GlobalContext
  );

  const openAgenceDialog = () =>
    dispatch({
      type: "AGENCE_DIALOG_OPEN",
    });

  const closeAgenceDialog = (event, reason, agence) => {
    if (
      event.target.innerText.toLowerCase() === "enregistrer" &&
      agence !== props.agence
    ) {
      console.log(agence);
      dispatch({ type: "AGENCE_DIALOG_CLOSE", payload: agence });
      updateAgence(agence);
      openSnackbar("Agence modifée avec succés!", "info");
    } else {
      dispatch({ type: "AGENCE_DIALOG_CLOSE" });
    }
  };

  const openConfirmationDialog = () => {
    dispatch({
      type: "CONFIRMATION_DIALOG_OPEN",
    });
  };
  const closeConfirmationDialog = (event, reason) => {
    console.log(event.target.innerText.toLowerCase());
    if (event.target.innerText.toLowerCase() === "oui") {
      dispatch({
        type: "CONFIRMATION_DIALOG_CLOSE",
        payload: props.agence.id,
      });
      deleteAgence(props.agence.id);
      openSnackbar("Agence supprimée avec succés!", "warning");
    } else {
      dispatch({
        type: "CONFIRMATION_DIALOG_CLOSE",
      });
    }
  };

  return (
    <TableRow key={props.agence.id} hover>
      <TableCell component="th" scope="agence">
        {props.agence.id}
      </TableCell>
      <TableCell align="left">{props.agence.nom}</TableCell>
      <TableCell align="left">{props.agence.addresse}</TableCell>
      <TableCell align="left">{props.agence.telephone}</TableCell>
      <TableCell align="center">
        <Tooltip title="Modifier">
          <IconButton
            variant="outlined"
            color="secondary"
            onClick={openAgenceDialog}
          >
            <Edit />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Supprimer">
          <IconButton
            variant="outlined"
            color="primary"
            onClick={openConfirmationDialog}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </TableCell>
      <AgenceFormDialog
        open={state.agenceDialogOpen}
        agence={props.agence}
        handleClose={closeAgenceDialog}
        currentPage="Modifier Agence"
      />
      <ConfirmationDialog
        open={state.confirmationDialogOpen}
        handleClickOpen={openConfirmationDialog}
        handleClose={closeConfirmationDialog}
        actionTitle="Supprimer Agence"
        actionLabel="supprimer l'agence"
      />
    </TableRow>
  );
}
