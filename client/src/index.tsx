import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let baseUrl = "";
if (process.env.NODE_ENV === "development")
  baseUrl = "http://localhost:5000/api";
else baseUrl = "http://localhost:8080/api";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
