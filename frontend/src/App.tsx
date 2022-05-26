import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.scss";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./Home";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
