import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { HomePage, PokemonPage } from "./pages";
import "./App.css";
import Api from "./API/Api";
//TODO:Page change with React router
function App() {
  return (
    <div>
      <Api />
    </div>
    /*
    <Router>
      <Switch>
        <Route path="/PokemonPage">
          {loggedIn ? <PokemonPage /> : <Redirect to="/" />}
        </Route>
        <Route path="/HomePage">
          {loggedIn ? <Redirect to="/PokemonPage" /> : <HomePage />}
        </Route>
      </Switch>
    </Router>
    */
  );
}

export default App;
