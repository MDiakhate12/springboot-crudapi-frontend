import React, { createContext, useEffect, useReducer } from "react";
import { agenceService } from "../services/AgenceService";
import { clientService } from "../services/ClientService";
import { compteService } from "../services/CompteService";
import { agenceReducer } from "./AgenceReducer";
import { clientReducer } from "./ClientReducer";
import { compteReducer } from "./CompteReducer";
import { currentPageReducer, snackbarReducer } from "./SnackbarReducer";

const initialState = {
  agences: [],
  clients: [],
  comptes: [],
  snackOpen: false,
  snackTitle: "",
  snackSeverity: "success",
  currentPage: "Gestion des agences",
};

// Context
export const GlobalContext = createContext(initialState);

export default function GlobalProvider({ children }) {
  const [{ agences }, agenceDispatch] = useReducer(agenceReducer, initialState);
  const [{ clients }, clientDispatch] = useReducer(clientReducer, initialState);
  const [{ comptes }, compteDispatch] = useReducer(compteReducer, initialState);
  const [
    { snackOpen, snackTitle, snackSeverity },
    snackbarDispatch,
  ] = useReducer(snackbarReducer, initialState);
  const [{ currentPage }, currentPageDispatch] = useReducer(
    currentPageReducer,
    initialState
  );
  // Agences Actions
  const getAllAgences = (agences) => {
    agenceDispatch({ type: "GET_ALL_AGENCES_SUCCESS", payload: agences });
  };

  const updateAgence = (agence) => {
    agenceService
      .update(agence.id, agence)
      .then((res) => {
        agenceDispatch({ type: "UPDATE_AGENCE_SUCCESS", payload: agence });
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  const createAgence = (agence) => {
    agenceService
      .create(agence)
      .then((res) => {
        console.log(res);
        agenceDispatch({ type: "CREATE_AGENCE_SUCCESS", payload: res.data });
      })
      .catch((err) => console.error(err));
  };

  const deleteAgence = (id) => {
    agenceService
      .remove(id)
      .then((res) => {
        agenceDispatch({ type: "DELETE_AGENCE_SUCCESS", payload: id });
        console.log(res);
      })
      .catch((err) => console.error(err));
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

  useEffect(() => {
    agenceService
      .getAll()
      .then((res) => {
        getAllAgences(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    clientService
      .getAll()
      .then((res) => {
        getAllClients(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    compteService
      .getAll()
      .then((res) => {
        getAllComptes(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Clients Actions
  const getAllClients = (clients) => {
    clientDispatch({ type: "GET_ALL_CLIENTS_SUCCESS", payload: clients });
  };

  const updateClient = (client) => {
    clientService
      .update(client.id, client)
      .then((res) => {
        clientDispatch({ type: "UPDATE_CLIENT_SUCCESS", payload: client });
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  const createClient = (client) => {
    clientService
      .create(client)
      .then((res) => {
        console.log(res);
        clientDispatch({ type: "CREATE_CLIENT_SUCCESS", payload: res.data });
      })
      .catch((err) => console.error(err));
  };

  const deleteClient = (id) => {
    clientService
      .remove(id)
      .then((res) => {
        clientDispatch({ type: "DELETE_CLIENT_SUCCESS", payload: id });
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  // Comptes Actions
const getAllComptes = (comptes) => {
  compteDispatch({ type: "GET_ALL_COMPTES_SUCCESS", payload: comptes });
};

const updateCompte = (compte) => {
  compteService
    .update(compte.id, compte)
    .then((res) => {
      compteDispatch({ type: "UPDATE_COMPTE_SUCCESS", payload: compte });
      console.log(res);
    })
    .catch((err) => console.error(err));
};

const createCompte = (idAgence, idClient, compte) => {
  compteService
    .create(idAgence, idClient, compte)
    .then((res) => {
      console.log(res);
      compteDispatch({ type: "CREATE_COMPTE_SUCCESS", payload: res.data });
    })
    .catch((err) => console.error(err));
};

const deleteCompte = (id) => {
  compteService
    .remove(id)
    .then((res) => {
      compteDispatch({ type: "DELETE_COMPTE_SUCCESS", payload: id });
      console.log(res);
    })
    .catch((err) => console.error(err));
};

  const setCurrentPage = (title) => {
    currentPageDispatch({type: "CURRENT_PAGE_CHANGED", payload: title});
  };

  return (
    <GlobalContext.Provider
      value={{
        agences,
        getAllAgences,
        updateAgence,
        deleteAgence,
        createAgence,
        clients,
        getAllClients,
        updateClient,
        deleteClient,
        createClient,
        comptes,
        getAllComptes,
        updateCompte,
        deleteCompte,
        createCompte,
        snackOpen,
        snackTitle,
        snackSeverity,
        openSnackbar,
        closeSnackbar,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
