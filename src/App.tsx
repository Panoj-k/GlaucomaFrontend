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
import Landing from './routes/landing'

function App() {

  return (
    // <div>
    //   <p>
    //     route
    //   </p>
    // </div>
    <Router>
    <div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav> */}

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
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
