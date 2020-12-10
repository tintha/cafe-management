const initialState = {
  status: "loading",
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  userProfile: {},
  loginError: null,
  registerError: null,
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
      localStorage.setItem("user", JSON.stringify(action.data.user_sid));
      return {
        ...state,
        status: "success",
        currentUser: action.data.user_sid,
        userProfile: { ...action.data },
        loginError: null,
        registerError: null,
      };
    }
    case "LOGIN_ERROR": {
      return {
        ...state,
        status: "error",
        loginError: action.error,
        currentUser: null,
        userProfile: {},
      };
    }
    case "LOGIN_CLEAR_ERROR": {
      return {
        ...state,
        status: "loading",
        loginError: null,
      };
    }
    case "REQUEST_LOGOUT": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "LOGOUT_SUCCESSFUL": {
      localStorage.removeItem("user");
      return {
        ...state,
        status: "iddle",
        currentUser: null,
        userProfile: {},
        loginError: null,
        registerError: null,
      };
    }
    case "LOGOUT_ERROR": {
      return {
        ...state,
        status: "error",
        loginError: action.error,
      };
    }
    case "REQUEST_REGISTRATION": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "REGISTRATION_SUCCESSFUL": {
      localStorage.setItem("user", JSON.stringify(action.data.user_sid));
      return {
        ...state,
        status: "iddle",
        currentUser: action.data.user_sid,
        userProfile: { ...action.data },
        loginError: null,
        registerError: null,
      };
    }
    case "REGISTRATION_ERROR": {
      localStorage.removeItem("user");
      return {
        ...state,
        status: "error",
        registerError: action.error,
        currentUser: null,
        userProfile: {},
      };
    }

    case "CLEAR_REGISTRATION_ERROR": {
      return {
        ...state,
        status: "loading",
        registerError: null,
      };
    }

    default: {
      return state;
    }
  }
}
