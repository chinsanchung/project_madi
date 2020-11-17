import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import MainPage from "./Pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;