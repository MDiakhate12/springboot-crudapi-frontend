import React, { createContext, useEffect, useReducer } from "react";
import { clientService } from "../services/ClientService";
import { clientReducer } from "./ClientReducer";

const initialState = {
  clients: [],
};

// Context
export const ClientContext = createContext(initialState);

export default function ClientProvider({ children }) {
  const [{ clients }, clientDispatch] = useReducer(clientReducer, initialState);

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

  useEffect(() => {
    clientService
      .getAll()
      .then((res) => {
        getAllClients(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  
  return (
    <ClientContext.Provider
      value={{
        clients,
        getAllClients,
        updateClient,
        deleteClient,
        createClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
