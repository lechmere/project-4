import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/auth'
import messageActive from '../images/nav-active-message.svg'
import messagePassive from '../images/nav-message.svg'
import swipeActive from '../images/nav-active-swipe.svg'
import swipePassive from '../images/nav-swipe.svg'
import profileActive from '../images/nav-active-profile.svg'
import profilePassive from '../images/nav-profile.svg'


const Menu = () => {

  return <nav>
    <Link to={'/message-home'}>
      <button className="nav-icon">
        <img className="icon-passive" src={messagePassive} alt={'message-passive'} />
        <img className="icon-active" src={messageActive} alt={'message-active'} />
      </button>
    </Link>

    <Link to={'/swipe'}>
      <button className="nav-icon">
        <img className="icon-passive" src={swipePassive} alt={'swipe-passive'} />
        <img className="icon-active" src={swipeActive} alt={'swipe-active'} />
      </button>
    </Link>

    <Link to={'/myprofile'}>
      <button className="nav-icon">
        <img className="icon-passive" src={profilePassive} alt={'profile-passive'} />
        <img className="icon-active" src={profileActive} alt={'profile-active'} />
      </button>
    </Link>

  </nav >
}

export default Menu