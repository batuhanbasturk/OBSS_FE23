import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useAuthentication } from "./Handler/useAuthentication";

const App = () => {
  const { userData, data, handleChange, handleSubmit, error } =
    useAuthentication();
  const [loggedIn, setLoggedIn] = useState(false);

  function callbackFunction(childData) {
    console.log("state changed from child");
    setLoggedIn(childData);
  }

  return (
    <Router>
      <Switch>
        <Route path="/Dashboard">
          {loggedIn ? <Dashboard userData={userData} /> : <Redirect to="/" />}
        </Route>
        <Route path="/">
          {loggedIn ? (
            <Redirect to="/Dashboard" />
          ) : (
            <Login
              parentCallback={callbackFunction}
              handleSubmit={(e) => handleSubmit(e, setLoggedIn)}
              handleChange={handleChange}
              data={data}
              error={error}
            />
          )}
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
