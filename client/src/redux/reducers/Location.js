const initialState = {
  path: null,
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case "REDIRECT_AFTER_LOGIN": {
      return {
        path: action.payload.path,
      };
    }
    case "CLEAN_PATH": {
      return {
        path: null,
      };
    }
    default: {
      return state;
    }
  }
}
