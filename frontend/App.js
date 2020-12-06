import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
import axios from 'axios'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import ProfileMatch from './components/ProfileMatch'
import NextMatch from './components/nextMatch'

// ! Some starter code for your frontends, change this
// ! however you like.
const App = () => {
  // Getting list of all users to be used throughout the app. 
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        localStorage.setItem('UsersLength', resp.data.length)
      })
      .catch(err => console.log(err))
  }, [])

  return <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/match/:profileId/" component={ProfileMatch} />
      <Route exact path="/nextmatch/:profileId/" component={NextMatch} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
}




export default App