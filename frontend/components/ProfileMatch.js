import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'

const ProfileMatch = (props) => {
  const [user, updateUser] = useState({})
  const [userId, updateUserId] = useState({})
  const token = localStorage.getItem('token')
  const userLength = Number(localStorage.getItem('UsersLength'))
  const currentProfile = props.match.params.profileId
  const [likeData, updateLikeData] = useState({
    liked_id: 4
  })
  const [matchesInfo, updateMatchesInfo] = useState([])

  // * Const to generate a random user for the next match. 


  const [randomUser, updateRandomUser] = useState(Number)

  // * Function to generate a random user for the next match. 
  const createRandom = () => {
    updateRandomUser(Math.floor(Math.random() * userLength + 1))
  }

  // * Checks that the random user is not the current user. If it is, it will generate a new 
  // * random user until it is not a match. 
  {
    getUserId() === randomUser ?
      createRandom
      :
      console.log('not matching ID - continue')
  }

  useEffect(() => {
    getProfileInfo()
    getMatchInfo()
    createRandom()
  }, [])

  // * GETting the information on the current random user. 
  function getProfileInfo() {
    axios.get(`/api/users/${currentProfile}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUser(resp.data)
        updateUserId(resp.data.id)
      })
      .catch(err => console.log(err))
  }

  // * Function that handles the information needed to POST to our likes table. 
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

  // * Function that handles when a user 'likes' the profile. 
  // * This pushs a POST request to the likes Table. 
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

  // * Function that loads the next 'match' page, after the YES or NO button haa
  function nextProfile() {
    props.history.push(`/match/${randomUser}`)
    location.reload()
  }

  function getMatchInfo() {
    axios.get('/api/matches', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateMatchesInfo(resp.data)
      })
      .catch(err => console.log(err))
    console.log(matchesInfo)
  }

  const matchOne = matchesInfo.map(match => {
    return match.match_one_id
  })

  const matchTwo = matchesInfo.map(match => {
    return match.match_two_id
  })

  const stringedOne = matchOne.toString()

  console.log(stringedOne)
  // function findingMatch() {
  //   if (matchTwo === userId) {
  //     return console.log('its a match')
  //   } else {
  //     return console.log('no match yet!')
  //   }
  // }

  // findingMatch()
  // console.log(matchTwo)
  // console.log(userId)

  // Expected to pick only firstname and age keys
  // console.log(
  //   filter(matchesInfo, 'match_one_id', 'match_two_id')
  // )

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