import React, { createContext, useReducer } from "react";
import {
  compteDialogReducer,
  currentPageReducer,
  snackbarReducer,
} from "./CommonReducers";

const initialState = {
  snakbar: {
    open: false,
    title: "",
    severity: "success",
  },
  currentPage: "Gestion des agences",
  compteDialog: {
    open: false,
    compte: {}
  },
  confirmationDialogOpen: false,
};

// Context
export const GlobalContext = createContext(initialState);

export default function GlobalProvider({ children }) {
  // const openConfirmationDialog = () => {
  //   dispatch({
  //     type: "CONFIRMATION_DIALOG_OPEN",
  //   });
  // };
  // const closeConfirmationDialog = (event, reason) => {
  //   // console.log(event.target.innerText.toLowerCase());
  //   if (event.target.innerText.toLowerCase() === "oui") {
  //     dispatch({
  //       type: "CONFIRMATION_DIALOG_CLOSE",
  //       payload: props.compte.id,
  //     });
  //     deleteCompte(props.compte.id);
  //     openSnackbar("Compte supprimé avec succés!", "warning");
  //   } else {
  //     dispatch({
  //       type: "CONFIRMATION_DIALOG_CLOSE",
  //     });
  //   }
  // };

  // const [dialogDetail, setDialogDetail] = React.useState({
  //   comptes: [],
  //   source: {},
  //   path: "",
  // });
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleClickOpen = async (path, source, event) => {
  //   event.preventDefault();
  //   let comptes = [];
  //   if (path === "agences") {
  //     comptes = (await compteService.getComptesByAgence(source.id)).data;
  //   } else {
  //     comptes = (await compteService.getComptesByClient(source.id)).data;
  //   }

  //   console.log({ source, comptes, path });

  //   setDialogDetail({ source, comptes, path });
  //   setOpen(true);
  // };

  const [{ snackbar }, snackbarDispatch] = useReducer(
    snackbarReducer,
    initialState
  );

  const [{ currentPage }, currentPageDispatch] = useReducer(
    currentPageReducer,
    initialState
  );

  const [{ compteDialog }, compteDialogDispatch] = useReducer(
    compteDialogReducer,
    initialState
  );

  const openCompteDialog = (compte) => {
    console.log("FROM COMPTE STATE:", compte)
    compteDialogDispatch({ type: "COMPTE_DIALOG_OPEN", payload: compte });
  };

  const closeCompteDialog = (event, reason, _, __, compte) => {
    compteDialogDispatch({ type: "COMPTE_DIALOG_CLOSE" });
  };

  const openSnackbar = (title, severity) =>
    snackbarDispatch({
      type: "SNACK_OPEN",
      payload: { title, severity },
    });

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    snackbarDispatch({
      type: "SNACK_CLOSE",
    });
  };

  const setCurrentPage = (title) => {
    currentPageDispatch({ type: "CURRENT_PAGE_CHANGED", payload: title });
  };

  return (
    <GlobalContext.Provider
      value={{
        snackbar,
        openSnackbar,
        closeSnackbar,
        currentPage,
        setCurrentPage,
        compteDialog,
        openCompteDialog,
        closeCompteDialog,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
