const initialState = {
  status: "iddle",
  items: null,
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ITEMS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVED_ITEMS": {
      return {
        ...state,
        status: "success",
        items: action.data,
      };
    }
    case "ITEMS_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    }

    // ADMIN DELETE ITEM
    case "REQUEST_DELETE_ITEM": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "DELETE_ITEM_SUCCESS": {
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload.itemId),
      };
    }
    case "DELETE_ITEM_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}
