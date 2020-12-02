const initialState = {
  status: "iddle",
  currentUser: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_LOGIN": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "LOGIN_SUCCESSFUL": {
      return {
        ...state,
        status: "success",
        currentUser: { ...action.data },
      };
    }
    case "LOGIN_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.error,
        username: null,
        user_sid: null,
      };
    }
    default: {
      return state;
    }
  }
}
