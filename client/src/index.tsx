import React, { StrictMode } from "react";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
