import React, { useContext, useEffect, useReducer } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { IconButton, Link, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { GlobalContext } from "../../contexts/GlobalState";
import { compteService } from "../../services/CompteService";
import { CompteContext } from "../../contexts/CompteState";

export default function CompteRow(props) {
  const { compteDiaglog, openCompteDialog, closeCompteDialog } = useContext(
    GlobalContext
  );

  return (
    <>
      <TableRow key={props.compte.id} hover>
        <TableCell component="th" scope="compte">
          {props.compte.id}
        </TableCell>
        <TableCell align="left">{props.compte.solde}</TableCell>
        <TableCell align="left">{props.compte.decouvert}</TableCell>

        <TableCell align="left">
          <Tooltip title="Cliquer pour ouvrir les détails de l'agence">
            <Link
              onClick={
                (event) => {}
                // handleClickOpen("agences", props.compte.agence, event)
              }
            >
              {props.compte.agence.nom}{" "}
            </Link>
          </Tooltip>
        </TableCell>
        <TableCell align="left">
          <Tooltip title="Cliquer pour ouvrir les détails du client">
            <Link
              onClick={
                (event) => {}
                // handleClickOpen("clients", props.compte.client, event)
              }
            >
              {`${props.compte.client.prenom} ${props.compte.client.nom}`}{" "}
            </Link>
          </Tooltip>
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Modifier">
            <IconButton
              variant="outlined"
              color="secondary"
              onClick={(event) => openCompteDialog(props.compte)}
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
              // onClick={openConfirmationDialog}
              size="small"
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
}
