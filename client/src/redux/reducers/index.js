import { combineReducers } from "redux";

import auth from "./auth-reducer";
import items from "./items-reducer";
import orders from "./orders-reducer";
import profile from "./profile-reducer";
import cart from "./cart-reducer";
import archived from "./archived-reducer";
import users from "./users-reducer";
import location from "./location-reducer";

export default combineReducers({
  auth,
  items,
  orders,
  profile,
  cart,
  archived,
  users,
  location,
});
