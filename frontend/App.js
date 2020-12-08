import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'


import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import ProfileMatch from './components/ProfileMatch'
import Swipe from './components/Swipe'
import Menu from './components/Menu'
import MessageHome from './components/MessageHome'
import Message from './components/Message'


// ! Some starter code for your frontends, change this
// ! however you like.
const App = () => {

  return <BrowserRouter>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/match/:profileId/" component={ProfileMatch} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/register" component={Register} />
      {/* <Route exact path="/profile/:userId/" componenet={Profile} /> */}
      <Route exact path="/swipe" component={Swipe} />
      <Route exact path="/message-home" component={MessageHome} />
      <Route exact path="/message" component={Message} />
    </Switch>
  </BrowserRouter>
}



export default App