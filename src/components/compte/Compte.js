import React, { useContext, useState } from "react";
import CompteTable from "./CompteTable";
import CompteFormDialog from "./CompteFormDialog";
import { AddCircle } from "@material-ui/icons";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { GlobalContext } from "../../contexts/GlobalState";
import SuccessSnackbar from "../common/SuccessSnackbar";

const useStyles = makeStyles((theme) => ({
  addButtonGrid: {
    marginBottom: theme.spacing(2),
  },
}));

function Compte() {
  const classes = useStyles();

  const [compteDialogOpen, setCompteDialogOpen] = useState(false);

  const { createCompte, openSnackbar } = useContext(GlobalContext);

  const closeCompteDialog = (event, reason, idAgence, idClient, compte) => {
    setCompteDialogOpen(false);
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
            onClick={() => setCompteDialogOpen(true)}
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
        open={compteDialogOpen}
        handleClose={closeCompteDialog}
        currentPage="Ajouter un nouveau compte"
      />
      <SuccessSnackbar />
    </div>
  );
}

export default Compte;
