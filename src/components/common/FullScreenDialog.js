import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Avatar, ListItemAvatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  inline: {
    display: "inline",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose, dialogDetail }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {dialogDetail.path === "agences" ? (
                <> Comptes de l'agence {dialogDetail?.source?.nom}</>
              ) : (
                <>
                  {" "}
                  Comptes du client {dialogDetail?.source?.prenom}{" "}
                  {dialogDetail?.source?.nom}
                </>
              )}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              {dialogDetail.path === "agences" ? (
                <> Téléphone: {dialogDetail?.source?.telephone}</>
              ) : (
                <> Date de naissance: {dialogDetail?.source?.dateNaissance} </>
              )}
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {dialogDetail.comptes.map((compte) => (
            <>
              <ListItem alignItems="flex-start">
                {dialogDetail.path === "agences" ? (
                  <>
                    <ListItemAvatar>
                      <Avatar>
                        {`${compte.client.prenom[0]}${compte.client.nom[0]}`}
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <>
                          <Typography variant="body1">
                            Numéro de compte: {compte.id}
                          </Typography>

                          <Typography variant="body1">
                            Client: {compte.client.prenom} {compte.client.nom}
                          </Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Typography color="textSecondary" variant="body2">
                            Solde: {compte.solde}
                          </Typography>

                          <Typography color="primary" variant="body2">
                            Découvert: {compte.decouvert}
                          </Typography>
                        </>
                      }
                    />
                  </>
                ) : (
                  <>
                    <ListItemText
                      primary={
                        <>
                          <Typography variant="body1">
                            Agence: {compte.agence.nom}
                          </Typography>

                          <Typography variant="body1">
                            Addresse: {compte.agence.addresse}
                          </Typography>

                          <Typography variant="body1">
                            Numéro de compte: {compte.id}
                          </Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Typography color="textSecondary" variant="body1">
                            Solde: {compte.solde}
                          </Typography>

                          <Typography color="primary" variant="body2">
                            Découvert: {compte.decouvert}
                          </Typography>
                        </>
                      }
                    />
                  </>
                )}
              </ListItem>

              <Divider />
            </>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
