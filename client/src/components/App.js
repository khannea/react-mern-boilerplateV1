import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import RegisterLogin from "./RegisterLogin";
import Register from "./RegisterLogin/register";
import About from "./About";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/about" exact component={About} />
        <Route path="/login" exact component={RegisterLogin} />
      </Switch>
    </>
  );
}

export default App;
