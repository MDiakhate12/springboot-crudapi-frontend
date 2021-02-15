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
import AgenceRow from "./AgenceRow";
import { AgenceContext } from "../../contexts/AgenceState";

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

export default function AgenceTable(props) {
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

  const { agences } = useContext(AgenceContext);

  return (
    <TableContainer className={classes.tableContainer} component={Paper} elevation={4}>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>#ID</TableCell>
            <TableCell align="left">Nom Agence</TableCell>
            <TableCell align="left">Addresse</TableCell>
            <TableCell align="left">Téléphone</TableCell>
            <TableCell align="center">Modifier</TableCell>
            <TableCell align="center">Supprimer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agences
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((agence) => (
              <AgenceRow key={agence.id} agence={agence} />
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={agences.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
