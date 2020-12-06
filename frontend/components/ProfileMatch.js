import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'

const ProfileMatch = (props) => {
  const [user, updateUser] = useState({})
  const token = localStorage.getItem('token')
  const userLength = Number(localStorage.getItem('UsersLength'))
  const currentProfile = props.match.params.profileId
  const [likeData, updateLikeData] = useState({
    liked_id: 4
  })
  const [matchesInfo, updateMatchesInfo] = useState([])

  // * Const to generate a random user for the next match. 
  const randomUser = Math.floor(Math.random() * userLength + 1)

  console.log(randomUser)
  // const [randomUser, updateRandomUser] = useState(0)
  console.log(userLength)


  // * Function that handles the information needed for POSTing to our likes table. 
  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...likeData,
      [name]: value
    }
    updateLikeData(data)
    handleLike()
  }

  // * Pulling the information on the current random user. 
  useEffect(() => {
    axios.get(`/api/users/${currentProfile}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUser(resp.data)
      })
      .catch(err => console.log(err))
  }, [])

  // {
  //   getUserId === randomUser ?
  //     console.log('UserId and dating profile ID matched - to generate another random number')
  //     :
  //     console.log('not matching ID - continue')
  // }

  // * Function that handles when a user 'likes' the profile. 
  // * This pushs a POST request to our likes Table. 
  function handleLike() {
    axios.post('/api/likes', likeData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        if (resp.data.errors) {
          return console.log(resp.data.errors)
        } else {
          nextProfile()
        }
      })
  }

  // * Function to reload the matches page with the next random user. 
  function nextProfile() {
    props.history.push(`/match/${randomUser}`)
    location.reload()
  }

  useEffect(() => {
    axios.get('/api/matches', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateMatchesInfo(resp.data)
      })
      .catch(err => console.log(err))
  }, [])

  console.log(matchesInfo)




  return <main>
    <h1>{user.username}</h1>
    <button
      onClick={nextProfile}
    >NO</button>
    <button
      onClick={handleChange}
      value={likeData.liked_id = user.id}
      name="liked_id"
    >YES</button>
  </main>
}

export default ProfileMatch