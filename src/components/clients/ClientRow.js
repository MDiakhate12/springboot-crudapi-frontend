import React, { useContext, useReducer } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { IconButton, Link, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import ClientFormDialog from "./ClientFormDialog";
import { GlobalContext } from "../../contexts/GlobalState";
import { ConfirmationDialog } from "../common/ConfirmationDialog";
import { compteService } from "../../services/CompteService";
import FullScreenDialog from "../common/FullScreenDialog";

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
  const { updateClient, deleteClient, openSnackbar } = useContext(
    GlobalContext
  );

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
      openSnackbar("Client modifié avecs succés!", "info");
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

  const [open, setOpen] = React.useState(false);
  const [dialogDetail, setDialogDetail] = React.useState({
    comptes: [],
    source: {},
    path: "",
  });
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = async (path, source, event) => {
    event.preventDefault();
    let comptes = (await compteService.getComptesByClient(source.id)).data;

    console.log({ source, comptes, path });

    setDialogDetail({ source, comptes, path });
    setOpen(true);
  };

  return (
    <>
      <TableRow key={props.client.id} hover>
        <TableCell component="th" scope="client">
          {props.client.id}
        </TableCell>
        <TableCell align="left">
          <Tooltip title="Cliquer pour ouvrir les détails du client">
            <Link
              onClick={(event) =>
                handleClickOpen("clients", props.client, event)
              }
            >
              {props.client.prenom}{" "}
            </Link>
          </Tooltip>
        </TableCell>

        <TableCell align="left">
          <Tooltip title="Cliquer pour ouvrir les détails du client">
            <Link
              onClick={(event) =>
                handleClickOpen("clients", props.client, event)
              }
            >
              {props.client.nom}{" "}
            </Link>
          </Tooltip>
        </TableCell>
        {/* <TableCell align="left">{props.client.prenom}</TableCell>
        <TableCell align="left">{props.client.nom}</TableCell> */}

        <TableCell align="left">{props.client.dateNaissance}</TableCell>
        <TableCell align="center">
          <Tooltip title="Modifier">
            <IconButton
              variant="outlined"
              color="secondary"
              onClick={openClientDialog}
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
        <FullScreenDialog
          open={open}
          dialogDetail={dialogDetail}
          handleClose={handleClose}
        />
      </TableRow>
    </>
  );
}
