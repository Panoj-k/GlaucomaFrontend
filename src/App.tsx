import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import HeaderBar from './components/header/HeaderBar'
import Landing from './routes/landing'

function App() {

  return (
    // <div>
    //   <p>
    //     route
    //   </p>
    // </div>
    <Router>
      <HeaderBar />
      <div>
        <Switch>
          <Route path="/about">
            <Landing />
          </Route>
          <Route path="/users">
            <Landing />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
  </Router>
  )
}

export default App
