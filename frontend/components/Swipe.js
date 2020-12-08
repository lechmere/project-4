import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import logo from '../images/logo.svg'
import distance from '../images/distance-marker.svg'
import decline from '../images/error-circle.svg'
import accept from '../images/heart-circle.svg'


function Swipe() {
  // const characters = db
  const [lastDirection, setLastDirection] = useState('')

  // Getting list of all users to be used throughout the app. 
  const token = localStorage.getItem('token')
  const [characters, updateCharacters] = useState([])
  const [matchesInfo, updateMatchesInfo] = useState([])
  const [characterId, updateCharacterId] = useState(Number)
  // const [itsAMatch, updateitsAMatch] = useState()

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
  function checkNewMatches() {
    console.log('Checking...')
    axios.get('/api/matches', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateMatchesInfo(resp.data)
        console.log(resp.data)
      })
      .catch(err => console.log(err))
  }
  // ? ----



  // ? Moving Deck
  const swiped = (direction, nameToDelete, characterId) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    updateCharacterId(characterId)

    // ? IF right POST to LIKES table
    if (direction === 'right') {
      console.log('Moved Right')

      axios.post('/api/likes', { liked_id: characterId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(
          checkNewMatches()
        )
        .then(
          filterMatches()
        )
    }
  }


  // ? Filtering matches to see if the current user & character ID are in the matches table. 
  function filterMatches() {
    const myMatches = matchesInfo.filter((match) => {
      return match.match_one_id === getUserId()
    })
    console.log(myMatches)
    const result = myMatches.filter(match => {
      return match.match_two_id === characterId
    })
    console.log(result)
  }


  // console.log('its a match!' + result)
  // handleMatch()
  

  // function handleMatch(event) {
  //   event.preventDefault()
  //   updateitsAMatch(!itsAMatch)
  //   console.log(itsAMatch)
  // }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return <div>
    <img className="logo" src={logo} alt={'kindlr'} />

    <div>
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
      </div>
      <div className="button-swipe">
        <button className="button-style"><img className="button-img" src={decline} alt={'decline'} /></button>
        <button className="button-style"><img className="button-img" id="accept" src={accept} alt={'accept'} /></button>
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}

      {/* {itsAMatch === true ?
        <h1>ITS A MATCH!!!</h1>
        :
        <h1>NOT A MATCH!!</h1>
      } */}
    </div>
  </div>



}



export default Swipe