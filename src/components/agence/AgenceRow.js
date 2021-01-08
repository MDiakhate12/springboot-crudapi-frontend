import React, { useContext, useReducer } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { IconButton, Link, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import AgenceFormDialog from "./AgenceFormDialog";
import { GlobalContext } from "../../contexts/GlobalState";
import { ConfirmationDialog } from "../common/ConfirmationDialog";
import { compteService } from "../../services/CompteService";
import FullScreenDialog from "../common/FullScreenDialog";

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
    let comptes = (await compteService.getComptesByAgence(source.id)).data;

    console.log({ source, comptes, path });

    setDialogDetail({ source, comptes, path });
    setOpen(true);
  };

  return (
    <TableRow key={props.agence.id} hover>
      <TableCell component="th" scope="agence">
        {props.agence.id}
      </TableCell>
      <TableCell align="left">
        <Tooltip title="Cliquer pour ouvrir les détails de l'agence">
          <Link
            onClick={(event) => handleClickOpen("agences", props.agence, event)}
          >
            {props.agence.nom}{" "}
          </Link>
        </Tooltip>
      </TableCell>
      {/* <TableCell align="left">{props.agence.nom}</TableCell> */}
      <TableCell align="left">{props.agence.addresse}</TableCell>
      <TableCell align="left">{props.agence.telephone}</TableCell>
      <TableCell align="center">
        <Tooltip title="Modifier">
          <IconButton
            variant="outlined"
            color="secondary"
            onClick={openAgenceDialog}
            size="small"
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
            size="small"
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
      <FullScreenDialog
        open={open}
        dialogDetail={dialogDetail}
        handleClose={handleClose}
      />
    </TableRow>
  );
}
