import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import Modal from './modal/Modal'
import NavBar from './NavBar'
import Banner from './Banner'
// import { PopUp } from './components/modal/PopUp';

const ProfileMatch = (props) => {
  const [user, updateUser] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [userId, updateUserId] = useState({})
  const token = localStorage.getItem('token')
  const userLength = Number(localStorage.getItem('UsersLength'))
  const currentProfile = props.match.params.profileId
  const [likeData, updateLikeData] = useState({
    liked_id: 4
  })
  const [matchesInfo, updateMatchesInfo] = useState([])


  // ? *******
  // * Const to generate a random user for the next match. 
  const [randomUser, updateRandomUser] = useState(Number)

  // * Function to generate a random user for the next match. 
  const createRandom = () => {
    updateRandomUser(Math.floor(Math.random() * userLength + 1))
  }
  // ? *******

  

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
  }

  // const matchOne = matchesInfo.map(match => {
  //   return match.match_one_id
  // })

  // const matchTwo = matchesInfo.map(match => {
  //   return match.match_two_id
  // })

  // // STRING TEST
  // const stringedOne = matchOne.toString()

  function matchCheck() {
    getMatchInfo()
    console.log(matchesInfo)

  }

  // EVERY time someone clicks yes 
  // Get match info
  // Filter out by current user 
  // IF the last line on match table is current user && profile user
  // Call popup function 

  return <>
  <Banner />
  <main>
    <>
      <div className="buttonwrapper">
        {/* if match */}
        <button onClick={() => setIsOpen(true)}>Its a match</button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          Congratulations! It's a match! 
      </Modal>
      </div>
      <div className="othercontent">Go get yourself some</div>
    </>
    <h1>{user.username}</h1>
    <button 
      onClick={nextProfile}
    >NO</button>
    <button
      onClick={handleChange, matchCheck}
      value={likeData.liked_id = user.id}
      name="liked_id"
    >YES</button>


  </main>
  <NavBar />
  </>
}

export default ProfileMatch