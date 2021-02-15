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
import CompteRow from "./CompteRow";
import { CompteContext } from "../../contexts/CompteState";

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
  tableContainer: {
    marginBottom: 65
  }
}));

export default function CompteTable() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { comptes } = useContext(CompteContext);

  return (
    <TableContainer className={classes.tableContainer} component={Paper} elevation={4}>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>#ID</TableCell>
            <TableCell align="left">Solde</TableCell>
            <TableCell align="left">Découvert</TableCell>
            <TableCell align="left">Agence</TableCell>
            <TableCell align="left">Client</TableCell>
            <TableCell align="center">Modifier</TableCell>
            <TableCell align="center">Supprimer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comptes
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((compte) => (
              <CompteRow key={compte.id} compte={compte} />
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={comptes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
