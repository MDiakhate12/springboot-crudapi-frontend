import React, { createContext, useEffect, useReducer } from "react";
import { agenceService } from "../services/AgenceService";
import { agenceReducer } from "./AgenceReducer";


const initialState = {
  agences: [],
};

// Context
export const AgenceContext = createContext(initialState);

export default function AgenceProvider({ children }) {
  const [{ agences }, agenceDispatch] = useReducer(agenceReducer, initialState);

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

  useEffect(() => {
    agenceService
      .getAll()
      .then((res) => {
        getAllAgences(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  
 
  return (
    <AgenceContext.Provider
      value={{
        agences,
        getAllAgences,
        updateAgence,
        deleteAgence,
        createAgence,
      }}
    >
      {children}
    </AgenceContext.Provider>
  );
}
