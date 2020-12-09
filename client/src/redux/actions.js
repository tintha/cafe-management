// ******************************** LOGIN ACTIONS
export const requestLogin = () => ({
  type: "REQUEST_LOGIN",
});

export const loginSuccess = (data) => ({
  type: "LOGIN_SUCCESSFUL",
  data,
});

export const loginError = (error) => ({
  type: "LOGIN_ERROR",
  error,
});

// ******************************** LOGOUT ACTIONS
export const requestLogout = () => ({
  type: "REQUEST_LOGOUT",
});

export const logoutSuccess = (data) => ({
  type: "LOGOUT_SUCCESSFUL",
  data,
});

export const logoutCleanOrders = () => ({
  type: "CLEANUP_ORDERS",
});

export const logoutCleanProfile = () => ({
  type: "CLEANUP_PROFILE",
});

export const cleanCart = () => ({
  type: "CLEANUP_CART",
});

export const logoutError = (error) => ({
  type: "LOGOUT_ERROR",
  error,
});

// ******************************** REGISTRATION ACTIONS
export const requestRegistration = () => ({
  type: "REQUEST_REGISTRATION",
});

export const registrationSuccess = (data) => ({
  type: "REGISTRATION_SUCCESSFUL",
  data,
});

export const registrationError = (error) => ({
  type: "REGISTRATION_ERROR",
  error,
});

// ******************************** ITEMS ACTIONS
export const requestItems = () => ({
  type: "REQUEST_ITEMS",
});

export const receivedItems = (data) => ({
  type: "RECEIVED_ITEMS",
  payload: { data },
});

export const itemsError = (error) => ({
  type: "ITEMS_ERROR",
  payload: { error },
});

// ******************************** USERS ORDERS ACTIONS
export const requestUserOrders = () => ({
  type: "REQUEST_USER_ORDERS",
});

export const receivedUserOrders = (data) => ({
  type: "RECEIVED_USER_ORDERS",
  payload: { data },
});

export const requestUserOrdersError = (error) => ({
  type: "REQUEST_USER_ORDERS_ERROR",
  payload: { error },
});

// ******************************** USERS PROFILE ACTIONS
export const requestProfile = () => ({
  type: "REQUEST_PROFILE",
});

export const profileSuccess = (data) => ({
  type: "PROFILE_SUCCESSFUL",
  data,
});

export const profileError = (error) => ({
  type: "PROFILE_ERROR",
  error,
});

// ******************************** ADMIN EDIT ORDERS ACTIONS
export const requestAdminOrders = () => ({
  type: "REQUEST_ADMIN_ORDERS",
});

export const receivedAdminOrders = (data) => ({
  type: "RECEIVED_ADMIN_ORDERS",
  data,
});

export const requestAdminOrdersError = (error) => ({
  type: "REQUEST_ADMIN_ORDERS_ERROR",
  error,
});

// ******************************** ADMIN EDIT MENU ITEM ACTIONS
export const editMenuItemSuccess = (id, updatedData) => ({
  type: "EDIT_MENU_ITEM_SUCCESS",
  payload: {
    id,
    updatedData,
  },
});

export const editMenuItemError = (error) => ({
  type: "EDIT_MENU_ITEM_ERROR",
  payload: { error },
});

// ******************************** ADMIN EDIT ORDER STATUS ACTIONS
export const editOrderSuccess = (orderId, orderStatus) => ({
  type: "EDIT_ORDER_SUCCESS",
  payload: {
    orderId,
    orderStatus,
  },
});

export const editOrderError = (error) => ({
  type: "EDIT_ORDER_ERROR",
  error,
});

// ******************************** ADMIN DELETE ITEM STATUS ACTIONS
export const deleteItemSuccess = (itemId) => ({
  type: "DELETE_ITEM_SUCCESS",
  payload: {
    itemId,
  },
});

export const deleteItemError = (error) => ({
  type: "DELETE_ITEM_ERROR",
  payload: { error },
});

// ******************************** CART ACTIONS
export const addItem = (item) => ({
  type: "ADD_ITEM",
  item,
});

export const removeItem = (item) => ({
  type: "REMOVE_ITEM",
  item,
});

export const updateQuantity = (item) => ({
  type: "UPDATE_QUANTITY",
  item,
});

// ******************************** ADMIN DELETE ORDER ACTIONS
export const deleteOrderSuccess = (orderId) => ({
  type: "DELETE_ORDER_SUCCESS",
  payload: {
    orderId,
  },
});

export const deleteOrderError = (error) => ({
  type: "DELETE_ORDER_ERROR",
  payload: { error },
});
