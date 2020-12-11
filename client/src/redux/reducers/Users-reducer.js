const initialState = {
  status: "loading",
  users: [],
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    // ADMIN ACTIONS
    case "REQUEST_USERS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVED_USERS": {
      return {
        ...state,
        status: "success",
        users: [...action.payload.data],
      };
    }
    case "REQUEST_USERS_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.payload.error,
      };
    }
    case "EDIT_USERS_SUCCESS": {
      return {
        ...state,
        status: "success",
        users: state.users.map((user) =>
          user._id !== action.payload.userId
            ? user
            : {
                ...user,
                status: action.payload.orderStatus,
              }
        ),
      };
    }
    case "EDIT_USERS_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.payload.error,
      };
    }
    case "DELETE_USERS_SUCCESS": {
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload.userId),
      };
    }
    case "DELETE_USERS_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.payload.error,
      };
    }
    case "CLEANUP_USERS": {
      return {
        status: "loading",
        users: [],
      };
    }
    default: {
      return state;
    }
  }
}
