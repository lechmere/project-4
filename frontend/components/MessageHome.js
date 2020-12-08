import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import { Link } from 'react-router-dom'

function MessageHome() {
  const token = localStorage.getItem('token')
  const [allMessages, updateAllMessages] = useState([])
  // const [userMessages, updateUserMessages] = useState([])

  useEffect(() => {
    axios.get('/api/message', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateAllMessages(resp.data)
      })
      .catch(err => console.log(err))
  }, [])

  console.log(getUserId())


  // ? Filtering by conversations the user started 
  const iStarted = allMessages.filter((message) => {
    return message.from_user_id === getUserId()
  })
  console.log(iStarted)

  // const checking = new Set(iStarted.to_user_id)

  // console.log(checking)


  // ? Filtering by conversations the match started 
  const theyStarted = allMessages.filter((message) => {
    return message.to_user_id === getUserId()
  })
  console.log(theyStarted)


  return <div>
    <h1>MESSAGE HOME</h1>
    {iStarted.map((messageTitle, index) => {
      return <Link key={index} to={'/message'}>
        <h2>{messageTitle.to_user.first_name} </h2>
      </Link>



    })}

    {theyStarted.map((messageTitle, index) => {
      return <Link key={index} to={'/message'}>
        <h2>{messageTitle.to_user.first_name} </h2>
      </Link>
    })}
  </div>



}

export default MessageHome