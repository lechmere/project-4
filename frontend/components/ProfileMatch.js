import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'

const ProfileMatch = (props) => {
  const [user, updateUser] = useState({})
  const [userList, updateUserList] = useState({})
  const token = localStorage.getItem('token')
  const profileId = 4
  const [likeData, updateLikeData] = useState({
    liked_id: 3
  })
  const randomUser = Math.floor(Math.random() * userList.length)


  if (getUserId !== randomUser) {
    // return gettingProfileId()
    return console.log('Not a match - function to be called')
  } else {
    return console.log('UserID and dating profile ID matched')
  }



  // console.log(getUserId())




  // console.log(randomUser)


  // * Function for pulling the information for the random profile. 
  function gettingProfileId() {
    axios.get(`/api/users/${profileId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUser(resp.data)
      })
      .catch(err => console.log(err))
  }

  function gettingAllUsers() {
    axios.get('/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUserList(resp.data)
      })
      .catch(err => console.log(err))
  }

  // console.log(userList.length)

  useEffect(() => {
    gettingProfileId()
    // gettingAllUsers()
  }, [])

  function handleLike(event) {
    event.preventDefault()
    axios.post('/api/likes', likeData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        if (resp.data.errors) return console.log(resp.data.errors)
        props.history.push('/')
      })
    // // .then(() => {
    // //   location.reload()
    // // })
  }


  // console.log(user)

  return <main>
    <h1>{user.username}</h1>
    <button>NO</button>
    <button
      onClick={handleLike}
      value={likeData.liked_id}
      name="liked_id"
    >YES</button>

  </main>


}

export default ProfileMatch