import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./utils/Cookies/Favourites";
import App from "./App";
require("dotenv").config();
ReactDOM.render(<App />, document.getElementById("root"));
