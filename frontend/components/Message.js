import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'

function Message(props) {
  const token = localStorage.getItem('token')

  console.log(props)
  
  return <div>
    <h1 className="testing">MESSAGES!!</h1>
  </div>

}

export default Message