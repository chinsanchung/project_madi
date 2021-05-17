import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const Search = lazy(() => import("./Search"));
const List = lazy(() => import("./List"));

function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route path="/" component={Search} exact />
          <Route path="/list" component={List} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default Routes;
