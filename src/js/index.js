//Import REACT
import React from "react";
import ReactDOM from "react-dom";

//Import BOOTSTRAP
import "bootstrap";

//Styles
import "../styles/index.scss";
import "../styles/TodoList.scss";

//Component
import TodoList from "./Component/TodoList.jsx";

//Render the react application
ReactDOM.render(<TodoList />, document.querySelector("#app"));
