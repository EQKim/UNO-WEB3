import "../index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../store/store";
import App from "./App";

const el = document.getElementById("root")!;
createRoot(el).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
