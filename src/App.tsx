import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import HeaderBar from './components/header/HeaderBar'
import Landing from './routes/landing'
import Detection from './routes/detection';

function App() {
  
  return (

    <Router>
      
      <div>
        <HeaderBar />
        <Switch>
          <Route path="/detection">
            <Detection />
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
