const initialState = {
  status: "loading",
  profile: {},
  error: null,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case "PROFILE_UPDATED": {
      return {
        ...state,
        profile: { ...action.payload.data },
      };
    }
    case "PROFILE_SUCCESSFUL": {
      return {
        ...state,
        status: "success",
        profile: { ...action.payload.data },
        error: null,
      };
    }
    case "PROFILE_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.payload.error,
      };
    }
    case "CLEANUP_PROFILE": {
      return {
        status: "loading",
        profile: {},
      };
    }
    default: {
      return state;
    }
  }
}
