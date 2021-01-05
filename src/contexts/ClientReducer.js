// Reducer
export const clientReducer = (state, action) => {
    switch (action.type) {
      case "GET_ALL_CLIENTS_SUCCESS":
        return {
          ...state,
          clients: action.payload,
        };
  
      case "UPDATE_CLIENT_SUCCESS":
        return {
          ...state,
          clients: state.clients.map((client) => {
            if (action.payload.id === client.id) {
              client = action.payload;
            }
            return client;
          }),
        };
  
      case "DELETE_CLIENT_SUCCESS":
        return {
          ...state,
          clients: state.clients.filter((client) => client.id !== action.payload),
        };
  
      case "CREATE_CLIENT_SUCCESS":
        return {
          ...state,
          clients: [action.payload, ...state.clients],
        };
  
      default:
        return state;
    }
  };
  