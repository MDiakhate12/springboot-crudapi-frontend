// Reducer
export const compteReducer = (state, action) => {
    switch (action.type) {
      case "GET_ALL_COMPTES_SUCCESS":
        return {
          ...state,
          comptes: action.payload,
        };
  
      case "UPDATE_COMPTE_SUCCESS":
        return {
          ...state,
          comptes: state.comptes.map((compte) => {
            if (action.payload.id === compte.id) {
              compte = action.payload;
            }
            return compte;
          }),
        };
  
      case "DELETE_COMPTE_SUCCESS":
        return {
          ...state,
          comptes: state.comptes.filter((compte) => compte.id !== action.payload),
        };
  
      case "CREATE_COMPTE_SUCCESS":
        return {
          ...state,
          comptes: [action.payload, ...state.comptes],
        };
  
      default:
        return state;
    }
  };
  