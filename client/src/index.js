import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import { ToastProvider } from "react-toast-notifications";

import App from "./App";

const store = configureStore();

ReactDOM.render(
  <ToastProvider placement="top-center" autoDismissTimeout="2000">
    <Provider store={store}>
      <App />
    </Provider>
  </ToastProvider>,
  document.getElementById("root")
);
