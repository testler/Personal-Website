import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Helmet } from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <React.StrictMode>
      <Helmet title="Joshua Garst's Portfolio" />
      <App id="app" />
    </React.StrictMode>
  </Router>
);
