import { combineReducers } from "redux";

import auth from "./auth-reducer";
import items from "./items-reducer";
import orders from "./orders-reducer";

export default combineReducers({ auth, items, orders });
