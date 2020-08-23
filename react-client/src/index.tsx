import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import Main from './Pages/main'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Switch>
        <Route path="/about">
          <div>Hello</div>
        </Route>
        <Route path="/users">
          <div>World</div>
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </React.StrictMode>
  </Router>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
