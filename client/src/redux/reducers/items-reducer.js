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
    default: {
      return state;
    }
  }
}
