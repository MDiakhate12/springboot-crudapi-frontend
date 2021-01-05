import React, { useContext, useReducer } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import ClientFormDialog from "./ClientFormDialog";
import { GlobalContext } from "../../contexts/GlobalState";
import { ConfirmationDialog } from "../common/ConfirmationDialog";

const initialState = {
  clientDialogOpen: false,
  confirmationDialogOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CLIENT_DIALOG_OPEN":
      return {
        ...state,
        clientDialogOpen: true,
      };
    case "CLIENT_DIALOG_CLOSE":
      return {
        ...state,
        clientDialogOpen: false,
        client: action.payload,
      };
    case "CONFIRMATION_DIALOG_OPEN":
      return {
        ...state,
        confirmationDialogOpen: true,
      };
    case "CONFIRMATION_DIALOG_CLOSE":
      if (action.payload === state.client) {
        return {
          ...state,
          confirmationDialogOpen: false,
          client: action.payload,
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

export default function ClientRow(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updateClient, deleteClient, openSnackbar } = useContext(GlobalContext);

  const openClientDialog = () =>
    dispatch({
      type: "CLIENT_DIALOG_OPEN",
    });

  const closeClientDialog = (event, reason, client) => {
    if (
      event.target.innerText.toLowerCase() === "enregistrer" &&
      client !== props.client
    ) {
      console.log(client);
      dispatch({ type: "CLIENT_DIALOG_CLOSE", payload: client });
      updateClient(client);
      openSnackbar("Client modifié avecs succés!", "info")
    } else {
      dispatch({ type: "CLIENT_DIALOG_CLOSE" });
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
        payload: props.client.id,
      });
      deleteClient(props.client.id);
      openSnackbar("Client supprimé avec succés!", "warning");
    } else {
      dispatch({
        type: "CONFIRMATION_DIALOG_CLOSE",
      });
    }
  };

  return (
    <>
    <TableRow key={props.client.id} hover>
      <TableCell component="th" scope="client">
        {props.client.id}
      </TableCell>
      <TableCell align="left">{props.client.prenom}</TableCell>
      <TableCell align="left">{props.client.nom}</TableCell>

      <TableCell align="left">{props.client.dateNaissance}</TableCell>
      <TableCell align="center">
        <IconButton
          variant="outlined"
          color="secondary"
          onClick={openClientDialog}
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
      <ClientFormDialog
        open={state.clientDialogOpen}
        client={props.client}
        handleClose={closeClientDialog}
        currentPage="Modifier Client"
      />
      <ConfirmationDialog
        open={state.confirmationDialogOpen}
        handleClickOpen={openConfirmationDialog}
        handleClose={closeConfirmationDialog}
        actionTitle="Supprimer Client"
        actionLabel="supprimer le client"
      />
    </TableRow>
    </>
  );
}
