import { combineReducers } from "redux";

import auth from "./auth-reducer";
import items from "./items-reducer";

export default combineReducers({ auth, items });
