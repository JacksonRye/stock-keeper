import React, { useState } from "react";
import logo from "./logo.svg";
import hero from "./hero.svg";
import "./scss/App.css";
import { GlobalProvider } from "./context/GlobalState";
import Inventory from "./views/Inventory";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Expenses from "./views/Expenses";
import About from "./views/About";

const routes = [
  { path: "/", name: "Inventory", Component: Inventory },
  { path: "/expenses", name: "Expenses", Component: Expenses },
  { path: "/about", name: "About", Component: About },
];

function App() {
  return (
    <GlobalProvider>
      <Router>
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path} component={Component} />
        ))}
      </Router>
    </GlobalProvider>
  );
}

export default App;
