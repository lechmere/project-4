import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import ProfileMatch from './components/ProfileMatch'

// ! Some starter code for your frontends, change this
// ! however you like.
const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/match" component={ProfileMatch} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
}




export default App