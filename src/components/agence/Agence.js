import React, { useContext, useState } from "react";
import AgenceTable from "./AgenceTable";
import AgenceFormDialog from "./AgenceFormDialog";
import { AddCircle } from "@material-ui/icons";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { GlobalContext } from "../../contexts/GlobalState";
import SuccessSnackbar from "../common/SuccessSnackbar";

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginBottom: theme.spacing(2),
  },
}));

function Agence() {
  const classes = useStyles();

  const [agenceDialogOpen, setAgenceDialogOpen] = useState(false);

  const { createAgence, openSnackbar } = useContext(
    GlobalContext
  );

  const closeAgenceDialog = (event, reason, agence) => {
    console.log(agence);
    setAgenceDialogOpen(false);
    if (event.target.innerText.toLowerCase() === "enregistrer") {
      // console.log(createAgence);
      createAgence(agence);
      openSnackbar("Agence ajoutée avec succés!", "success");
    }
  };
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={7} className={classes.addButton}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircle />}
            onClick={() => setAgenceDialogOpen(true)}
            size="small"
          >
            Ajouter Agence
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={7}>
          <AgenceTable />
        </Grid>
      </Grid>
      <AgenceFormDialog
        open={agenceDialogOpen}
        handleClose={closeAgenceDialog}
        currentPage="Ajouter une nouvelle agence"
      />
      <SuccessSnackbar />
    </div>
  );
}

export default Agence;
