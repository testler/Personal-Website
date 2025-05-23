import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <React.StrictMode>
      <HelmetProvider>
        <App id="app" />
      </HelmetProvider>
    </React.StrictMode>
  </Router>
);
serviceWorkerRegistration.register();
reportWebVitals();