import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import axios from 'axios'
import { getUserId } from '../lib/auth'
// import logo from '../images/logo.svg'
import logo from '../images/logo.svg'


import distance from '../images/distance-marker.svg'
import decline from '../images/error-circle.svg'
import accept from '../images/heart-circle.svg'
import Modal from './modal/Modal'


function Swipe() {
  // const characters = db
  const [lastDirection, setLastDirection] = useState('')

  // Getting list of all users to be used throughout the app. 
  const token = localStorage.getItem('token')
  const [characters, updateCharacters] = useState([])
  const [matchesInfo, updateMatchesInfo] = useState([])
  const [characterId, updateCharacterId] = useState(Number)
  const [isOpen, setIsOpen] = useState(false)
  const [testing, updateTesting] = useState([])
  const [finalMatch, updateFinalMatch] = useState([])

  useEffect(() => {
    checkNewMatches()
  }, [])

  // ? GET a list of all USERS to update CHARACTERS for CARDS
  useEffect(() => {
    axios.get('/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateCharacters(resp.data)
      })
      .catch(err => console.log(err))
  }, [])
  // ? ----


  // ? SWIPE matches check


  async function checkNewMatches() {
    console.log('Checking...')
    await axios.get('/api/matches', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateMatchesInfo(resp.data)
        filterMatches(resp.data)
        console.log(resp.data)
      })
      .catch(err => console.log(err))

  }
  // ? ----




  function filterMatches(matchesData) {
    const myMatches = matchesData.filter((match) => {
      return match.match_one_id === getUserId()
    })
    console.log(myMatches)
    updateTesting(myMatches)
    // filterLastMatch()
    return myMatches
  //   const checkFilter = myMatches.filter((match) => {
  //     return match.match_two_id === characterId
  //   })
  //   console.log(checkFilter)
  //   return checkFilter
  }

  console.log(characterId)

  // function filterLastMatch() {
  //   const last = testing.filter((match) => {
  //     return match.match_two_id !== characterId
  //   })
  //   console.log(last)
  //   return last
  // }






  // const myMatches = matchesInfo.filter((match) => {
  //   match.match_one_id === getUserId() || match.match_two_id === getUserId()
  //   return myMatches
  // })
  // console.log(myMatches)

  // const filteredMatches = filterMatches()
  // console.log(filteredMatches)

  // ? Filtering matches to see if the current user & character ID are in the matches table. 

  // console.log(myMatches)

  // const myMatches = matchesInfo.filter((match) => {
  //   if (match.match_one_id === getUserId() || match.match_two_id === getUserId()) {
  //     return myMatches
  //   }
  // })
  // console.log(myMatches)
  // const result = myMatches.filter(match => {
  //   return match.match_two_id === characterId
  // })
  // console.log(result)







  // ? Moving Deck
  async function swiped(direction, nameToDelete, characterId) {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    updateCharacterId(characterId)

    // ? IF right POST to LIKES table
    if (direction === 'right') {
      console.log('Moved Right')

      await axios.post('/api/likes', { liked_id: characterId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(
          checkNewMatches(),
          checkNewMatches()
        )
    }
  }




  // console.log('its a match!' + result)
  // handleMatch()


  // function handleMatch(event) {
  //   event.preventDefault()
  //   setIsOpen(!isOpen)
  //   console.log(isOpen)
  // }


  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return <div>
    <img className="logo" src={logo} alt={'kindlr'} />

    <div>
      <div className="buttonwrapper">
        <button onClick={() => setIsOpen(true)}>Its a match</button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          Congratulations! Its a match!
        </Modal>
      </div>
      <div className='cardContainer'>
        {characters.map((character) =>
          <TinderCard className='swipe'
            key={character.first_name}
            onSwipe={(dir) => swiped(dir, character.first_name, character.id)}
            onCardLeftScreen={() => outOfFrame(character.first_name)}
          >
            <div style={{ backgroundImage: 'url(' + character.image + ')' }} className='card'>
              <div className='card-distance'>
                <img src={distance} alt={'distance-arrow'} />
                <h3>2.2 Km away</h3>
              </div>
              <div className='card-user'>
                <h2>{character.first_name}, {character.age}</h2>
                <h3>{character.bio}</h3>
              </div>
            </div>
          </TinderCard>
        )}
        <br />
        <p className="tinder-text">Oh no! You have run out of swipes!</p>
      </div>
      <div className="button-group">
        <button className="button-style"><img className="button-img" src={decline} alt={'decline'} /></button>
        <button className="button-style" id="button-style-right"><img className="button-img" id="accept" src={accept} alt={'accept'} /></button>
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'> Get Swiping</h2>}

      {/* {itsAMatch === true ?
        <h1>ITS A MATCH!!!</h1>
        :
        <h1>NOT A MATCH!!</h1>
      } */}
    </div>
  </div>



}



export default Swipe