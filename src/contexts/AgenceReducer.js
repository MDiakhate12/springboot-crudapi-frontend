// Reducer
export const agenceReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_AGENCES_SUCCESS":
      return {
        ...state,
        agences: action.payload,
      };

    case "UPDATE_AGENCE_SUCCESS":
      return {
        ...state,
        agences: state.agences.map((agence) => {
          if (action.payload.id === agence.id) {
            agence = action.payload;
          }
          return agence;
        }),
      };

    case "DELETE_AGENCE_SUCCESS":
      return {
        ...state,
        agences: state.agences.filter((agence) => agence.id !== action.payload),
      };

    case "CREATE_AGENCE_SUCCESS":
      return {
        ...state,
        agences: [action.payload, ...state.agences],
      };

    default:
      return state;
  }
};
