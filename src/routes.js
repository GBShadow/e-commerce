import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";

const Routes = () => {
  return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/detail/:id" component={Detail} />
      </Switch>
  );
};

export default Routes;
