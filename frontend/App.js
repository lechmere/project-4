import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
import axios from 'axios'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import ProfileMatch from './components/ProfileMatch'


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
      <Route exact path="/login" component={Login} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/register" component={Register} />
      {/* <Route exact path="/profile/:userId/" componenet={Profile} /> */}
    </Switch>
  </BrowserRouter>
}



// class App extends Component {
//     constructor() {
//         super();
//         this.state = {
//             isShowing: false
//         }
//     }
//     openModalHandler = () => {
//         this.setState({
//             isShowing: true
//         });
//     }
//     closeModalHandler = () => {
//         this.setState({
//             isShowing: false
//         });
//     }
//     render () {
//         return (
//             <div>
//                 { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

//                 <button className="open-modal-btn" onClick={this.openModalHandler}>Open Modal</button>

//                 <Modal
//                     className="modal"
//                     show={this.state.isShowing}
//                     close={this.closeModalHandler}>
//                         Maybe aircrafts fly very high because they don't want to be seen in plane sight?
//                 </Modal>
//             </div>
//         );
//     }
// }

export default App