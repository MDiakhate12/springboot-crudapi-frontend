import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TablePagination } from "@material-ui/core";
import ClientRow from "./ClientRow";
import { GlobalContext } from "../../contexts/GlobalState";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  head: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.primary.main
        : theme.palette.primary.light,
  },
}));

export default function ClientTable() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const handleConfirmationDialogClickOpen = (id) => {
  //   setConfirmationDialogOpen(true);
  //   setIdToDelete(id);
  // };
  // const handleConfirmationDialogClose = (event, reason) => {
  //   setConfirmationDialogOpen(false);

  //   let feedback = event.target.innerText;

  //   if (feedback.toLowerCase() === "oui") {
  //     setClients(clients.filter((client) => client.id !== idToDelete));
  //     ClientService
  //       .remove(idToDelete)
  //       .then((response) => {
  //         console.log(response);
  //         setSnackOpen(true);
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { clients } = useContext(GlobalContext);

  return (
    <TableContainer component={Paper} elevation={4}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>#ID</TableCell>
            <TableCell align="left">Prénom</TableCell>
            <TableCell align="left">nom</TableCell>
            <TableCell align="left">Date de naissance</TableCell>
            <TableCell align="center">Modifier</TableCell>
            <TableCell align="center">Supprimer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={clients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
