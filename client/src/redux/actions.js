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

export const loginClearError = () => ({
  type: "LOGIN_CLEAR_ERROR",
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

export const clearRegistrationError = () => ({
  type: "CLEAR_REGISTRATION_ERROR",
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
export const profileSuccess = (data) => ({
  type: "PROFILE_SUCCESSFUL",
  payload: { data },
});

export const profileError = (error) => ({
  type: "PROFILE_ERROR",
  payload: { error },
});

export const profileUpdated = (data) => ({
  type: "PROFILE_UPDATED",
  payload: { data },
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

// ******************************** ADMIN ARCHIVED ACTIONS
export const requestArchived = () => ({
  type: "REQUEST_ARCHIVED",
});

export const receivedArchived = (data) => ({
  type: "RECEIVED_ARCHIVED",
  payload: { data },
});

export const requestArchivedError = (error) => ({
  type: "REQUEST_ARCHIVED_ERROR",
  payload: { error },
});

export const deleteArchivedSuccess = (orderId) => ({
  type: "DELETE_ARCHIVED_SUCCESS",
  payload: {
    orderId,
  },
});

export const deleteArchivedError = (error) => ({
  type: "DELETE_ARCHIVED_ERROR",
  payload: { error },
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
export const editOrderSuccess = (orderId, orderStatus, isArchived) => ({
  type: "EDIT_ORDER_SUCCESS",
  payload: {
    orderId,
    orderStatus,
    isArchived,
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

// ******************************** ADMIN USERS MANAGEMENT ACTIONS
export const requestUsers = () => ({
  type: "REQUEST_USERS",
});

export const receivedUsers = (data) => ({
  type: "RECEIVED_USERS",
  payload: { data },
});

export const requestUsersError = (error) => ({
  type: "REQUEST_USERS_ERROR",
  payload: { error },
});

export const editUsersSuccess = (id, updatedData) => ({
  type: "EDIT_USERS_SUCCESS",
  payload: {
    id,
    updatedData,
  },
});

export const editUsersError = (error) => ({
  type: "EDIT_USERS_ERROR",
  payload: { error },
});

export const deleteUsersSuccess = (userId) => ({
  type: "DELETE_USERS_SUCCESS",
  payload: {
    userId,
  },
});

export const deleteUsersError = (error) => ({
  type: "DELETE_USERS_ERROR",
  payload: { error },
});

export const logoutCleanUsers = () => ({
  type: "CLEANUP_USERS",
});

// ********************************************* LOCATION
export const redirectAfterLogin = (path) => ({
  type: "REDIRECT_AFTER_LOGIN",
  payload: { path },
});

export const cleanPath = () => ({
  type: "CLEAN_PATH",
});
