const initialState = {
  status: "iddle",
  profile: {},
  error: null,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_PROFILE": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "PROFILE_SUCCESSFUL": {
      return {
        ...state,
        status: "success",
        profile: { ...action.data },
        error: null,
      };
    }
    case "PROFILE_ERROR": {
      return {
        ...state,
        status: "error",
        error: null,
        profile: {},
      };
    }

    default: {
      return state;
    }
  }
}
