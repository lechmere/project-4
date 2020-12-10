import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'


import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import Swipe from './components/Swipe'
import MessageHome from './components/MessageHome'
import Message from './components/Message'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'

// ! Some starter code for your frontends, change this
// ! however you like.
const App = () => {

  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/swipe" component={Swipe} />
      <Route exact path="/message-home" component={MessageHome} />
      <Route exact path="/message" component={Message} />
      <Route exact path="/profile/:userId" component={Profile} />
      <Route exact path="/message/:id" component={Message} />
      <Route exact path="/editprofile/" component={EditProfile}/>
    </Switch>
  </BrowserRouter>
}



export default App