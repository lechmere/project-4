import React from 'react'
import { Link } from 'react-router-dom'
// import { getUserId } from '../lib/UserToken'


const NavBar = () => {
  // const token = localStorage.getItem('token')
  // const userId = getUserId(token)

  return <footer className="navbar">
    <div className="navbar-section">
      <Link className="navbar-link" to="/">
        <div className="navbar-messages"></div>
      </Link>
    </div>
    <div className="navbar-section">
      <Link className="navbar-link" to="/match">
      {/* <Link className="navbar-link" to={`/match/${profileId}/`}> */}
        <div className="navbar-match"></div>
      </Link>
    </div>
    <div className="navbar-section">
      <Link className="navbar-link" to="/profile">
      {/* <Link className="navbar-link" to={`/profile/${userId}`}> */}
        <div className="navbar-profile"></div>
      </Link>
    </div>
  </footer>
}

export default NavBar