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
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#39dbbb",
      contrastText: "#fff",
    },
    secondary: {
      main: "#E36647",
      contrastText: "#fff",
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Router>
  );
}

export default App;
