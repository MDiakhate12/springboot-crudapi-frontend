import React, { createContext, useEffect, useReducer } from "react";
import { compteService } from "../services/CompteService";
import { compteReducer } from "./CompteReducer";

const initialState = {
  comptes: [],
};

// Context
export const CompteContext = createContext(initialState);

export default function CompteProvider({ children }) {
  const [{ comptes }, compteDispatch] = useReducer(compteReducer, initialState);

  useEffect(() => {
    compteService
      .getAll()
      .then((res) => {
        console.log(res.data)
        getAllComptes(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

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

  return (
    <CompteContext.Provider
      value={{
        comptes,
        getAllComptes,
        updateCompte,
        deleteCompte,
        createCompte,
      }}
    >
      {children}
    </CompteContext.Provider>
  );
}
