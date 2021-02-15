import React, { useContext, useState } from "react";
import ClientTable from "./ClientTable";
import ClientFormDialog from "./ClientFormDialog";
import { AddCircle } from "@material-ui/icons";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { GlobalContext } from "../../contexts/GlobalState";
import SuccessSnackbar from "../common/SuccessSnackbar";
import { ClientContext } from "../../contexts/ClientState";

const useStyles = makeStyles((theme) => ({
  addButtonGrid: {
    marginBottom: theme.spacing(2),
  },
}));

function Client() {
  const classes = useStyles();

  const [clientDialogOpen, setClientDialogOpen] = useState(false);

  const { createClient } = useContext(ClientContext);

  const { openSnackbar } = useContext(GlobalContext);

  const closeClientDialog = (event, reason, client) => {
    setClientDialogOpen(false);
    if (event.target.innerText.toLowerCase() === "enregistrer") {
      createClient(client);
      openSnackbar("Client ajouté avec succés!", "success");
      // console.log(client)
    }
  };
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={7} className={classes.addButtonGrid}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircle />}
            onClick={() => setClientDialogOpen(true)}
            size="small"
            // className={classes.addButton}
          >
            Ajouter Client
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={7}>
          <ClientTable />
        </Grid>
      </Grid>
      <ClientFormDialog
        open={clientDialogOpen}
        handleClose={closeClientDialog}
        currentPage="Ajouter un nouveau client"
      />
      <SuccessSnackbar />
    </div>
  );
}

export default Client;
