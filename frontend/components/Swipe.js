import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import axios from 'axios'
import { getUserId } from '../lib/auth'

// const db = [
//   {
//     name: 'Richard Hendricks',
//     url: './img/richard.jpg'
//   },
//   {
//     name: 'Erlich Bachman',
//     url: './img/erlich.jpg'
//   },
//   {
//     name: 'Monica Hall',
//     url: './img/monica.jpg'
//   },
//   {
//     name: 'Jared Dunn',
//     url: './img/jared.jpg'
//   },
//   {
//     name: 'Dinesh Chugtai',
//     url: './img/dinesh.jpg'
//   }
// ]

function Swipe() {
  // const characters = db
  const [lastDirection, setLastDirection] = useState('')

  // Getting list of all users to be used throughout the app. 
  const token = localStorage.getItem('token')
  const [characters, updateCharacters] = useState([])
  const [matchesInfo, updateMatchesInfo] = useState([])
  const [characterId, updateCharacterId] = useState(Number)
  const [itsAMatch, updateitsAMatch] = useState()

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
    // console.log('its a match!' + result)
    handleMatch()
    return result
  }

  function handleMatch(event) {
    event.preventDefault()
    updateitsAMatch(!itsAMatch)
    console.log(itsAMatch)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }


  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {characters.map((character) =>
          <TinderCard className='swipe'
            key={character.first_name}
            onSwipe={(dir) => swiped(dir, character.first_name, character.id)}
            onCardLeftScreen={() => outOfFrame(character.first_name)}
          >
            <div style={{ backgroundImage: 'url(' + character.image + ')' }} className='card'>
              <h3>{character.first_name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}

      {itsAMatch === true ?
        <h1>ITS A MATCH!!!</h1>
        :
        <h1>NOT A MATCH!!</h1>
      }
    </div>
  )
}

export default Swipe