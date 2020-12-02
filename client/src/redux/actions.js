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
