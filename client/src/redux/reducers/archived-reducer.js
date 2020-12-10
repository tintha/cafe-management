const initialState = {
  status: "loading",
  archived: [],
};

export default function archivedReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ARCHIVED": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVED_ARCHIVED": {
      return {
        ...state,
        status: "success",
        archived: [...action.payload.data],
      };
    }
    case "REQUEST_ARCHIVED_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.payload.error,
      };
    }

    // ADMIN DELETE ARCHIVED ORDER
    case "DELETE_ARCHIVED_SUCCESS": {
      return {
        ...state,
        archived: state.archived.filter(
          (order) => order._id !== action.payload.orderId
        ),
      };
    }
    case "DELETE_ARCHIVED_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.payload.error,
      };
    }

    default: {
      return state;
    }
  }
}
