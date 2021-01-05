export const snackbarReducer = (state, action) => {
  switch (action.type) {
    case "SNACK_OPEN":
      if (action.payload.severity) {
        return {
          ...state,
          snackOpen: true,
          snackTitle: action.payload.title,
          snackSeverity: action.payload.severity,
        };
      } else {
        return {
          ...state,
          snackOpen: true,
          snackTitle: action.payload.title,
        };
      }

    case "SNACK_CLOSE":
      return {
        ...state,
        snackOpen: false,
      };

    default:
      return state;
  }
};

export const currentPageReducer = (state, action) => {
  switch (action.type) {
    case "CURRENT_PAGE_CHANGED":
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};






