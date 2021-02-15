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

export const compteDialogReducer = (state, action) => {
  switch (action.type) {
    case "COMPTE_DIALOG_OPEN":
      return {
        ...state,
        compteDialog: {
          open: true,
          compte: action.payload,
        },
      };
    case "COMPTE_DIALOG_CLOSE":
      return {
        ...state,
        compteDialog: {
          open: false,
          compte: {}
        },
      };
    default:
      return state;
  }
};

export const confirmationDialogReducer = (state, action) => {
  switch (action.type) {
    case "CONFIRMATION_DIALOG_OPEN":
      return {
        ...state,
        confirmationDialogOpen: true,
      };
    case "CONFIRMATION_DIALOG_CLOSE":
      if (action.payload === state.compte) {
        return {
          ...state,
          confirmationDialogOpen: false,
          compte: action.payload,
        };
      } else {
        return {
          ...state,
          confirmationDialogOpen: false,
        };
      }
    default:
      return state;
  }
};
