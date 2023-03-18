import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HeaderBar from "./components/header/HeaderBar";
import Landing from "./routes/landing";
import Detection from "./routes/detection";
import Result from "./routes/result";
import ImageContextProvider from "./context/imageContext";

function App() {
  return (
    <Router>
      <ImageContextProvider>
        <div>
          <HeaderBar />
          <Switch>
            <Route path="/detection">
              <Detection />
            </Route>
            <Route path="/result">
              <Result />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </div>
      </ImageContextProvider>
    </Router>
  );
}

export default App;
