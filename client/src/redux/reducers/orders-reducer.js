const initialState = {
  status: "iddle",
  orders: null,
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    // ADMIN ACTIONS
    case "REQUEST_ADMIN_ORDERS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVED_ADMIN_ORDERS": {
      return {
        ...state,
        status: "success",
        orders: action.data,
      };
    }
    case "REQUEST_ADMIN_ORDERS_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    }
    // USER ACTIONS
    case "REQUEST_USER_ORDERS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVED_USER_ORDERS": {
      return {
        ...state,
        status: "success",
        orders: action.data,
      };
    }
    case "REQUEST_USER_ORDERS_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    }
    case "CLEANUP_ORDERS": {
      return {
        status: "iddle",
        orders: null,
      };
    }
    default: {
      return state;
    }
  }
}
