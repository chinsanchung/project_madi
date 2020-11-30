import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from 'axios';

let baseUrl ='http://localhost:5000';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
