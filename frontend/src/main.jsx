import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./admin/assets/styles/main.scss";

import store from "./admin/redux/store";
import WebsiteProvider from "./context/WebsiteProvider";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <WebsiteProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WebsiteProvider>
  </Provider>,
);
