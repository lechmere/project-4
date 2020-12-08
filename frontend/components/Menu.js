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
    <button> <img src={messagePassive} alt={'accept'} /></button>
    <button> <img src={swipeActive} alt={'accept'} /></button>
    <button> <img src={profilePassive} alt={'accept'} /></button>
  </nav>
}

export default Menu