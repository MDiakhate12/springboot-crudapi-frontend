import React, { useContext, useState } from "react";
import CompteTable from "./CompteTable";
import CompteFormDialog from "./CompteFormDialog";
import { AddCircle } from "@material-ui/icons";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { GlobalContext } from "../../contexts/GlobalState";
import SuccessSnackbar from "../common/SuccessSnackbar";
import { CompteContext } from "../../contexts/CompteState";
import { ConfirmationDialog } from "../common/ConfirmationDialog";
import FullScreenDialog from "../common/FullScreenDialog";

const useStyles = makeStyles((theme) => ({
  addButtonGrid: {
    marginBottom: theme.spacing(2),
  },
}));

function Compte() {
  const classes = useStyles();


  const { createCompte } = useContext(CompteContext);
  const { compteDialog, openCompteDialog, openSnackbar } = useContext(GlobalContext);

  const closeCompteDialog = (event, reason, idAgence, idClient, compte) => {
    if (event.target.innerText.toLowerCase() === "enregistrer") {
      createCompte(idAgence, idClient, compte);
      openSnackbar("Compte ajouté avec succés!", "success");
      // console.log(compte)
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
            onClick={() => openCompteDialog({})}
            size="small"
            // className={classes.addButton}
          >
            Ajouter Compte
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={7}>
          <CompteTable />
        </Grid>
      </Grid>
      <CompteFormDialog
        open={compteDialog.open}
        // handleClose={closeCompteDialog}
        currentPage="Ajouter un nouveau compte"
      />
      {/* <SuccessSnackbar /> */}

      {/* <ConfirmationDialog
        open={confirmationDialogOpen}
        handleClickOpen={openConfirmationDialog}
        handleClose={closeConfirmationDialog}
        actionTitle="Supprimer Compte"
        actionLabel="supprimer le compte"
      />
      <FullScreenDialog
        open={open}
        dialogDetail={dialogDetail}
        handleClose={handleClose}
      /> */}
    </div>
  );
}

export default Compte;
