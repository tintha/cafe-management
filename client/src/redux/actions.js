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
  data,
});

export const itemsError = (error) => ({
  type: "ITEMS_ERROR",
  error,
});

// ******************************** USERS ORDERS ACTIONS
export const requestUserOrders = () => ({
  type: "REQUEST_USER_ORDERS",
});

export const receivedUserOrders = (data) => ({
  type: "RECEIVED_USER_ORDERS",
  data,
});

export const requestUserOrdersError = (error) => ({
  type: "REQUEST_USER_ORDERS_ERROR",
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

// ******************************** ADMIN EDIT MENU ACTIONS
export const editMenuRequest = () => ({
  type: "REQUEST_EDIT_MENU",
});

export const editMenuSuccess = (data) => ({
  type: "EDIT_MENU_SUCCESS",
  data,
});

export const editMenuError = (error) => ({
  type: "EDIT_MENU_ERROR",
  error,
});
