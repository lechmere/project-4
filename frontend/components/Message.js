import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'

function Message(props) {
  const token = localStorage.getItem('token')
  const toId = props.match.params.id
  const [allMessages, updateAllMessages] = useState([])
  const [currentUserCheck, updateCurrentUserCheck] = useState([])
  const [text, setText] = useState('')

  // // Message content form
  const [userMessage, updateUserMessage] = useState({
    to_user_id: toId,
    content: ''
  })

  // // Handle information needed to POST the message
  function handleChange(event) {
    const name = event.target.name
    const value = event.target.event
    const data = {
      ...userMessage,
      [name]: value
    }
    updateUserMessage(data)
    handleSubmit()
  }

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

  const filter = {
    from_user_id: toId,
    to_user_id: getUserId()
  }

  const filteredMessage = allMessages.filter(function (item) {
    for (var key in filter) {
      if (item[key] === undefined || item[key] != filter[key])
        return false
    }
    return true
  })

  const toFilter = {
    from_user_id: getUserId(),
    to_user_id: toId
  }

  const tofilterMessage = allMessages.filter(function (item) {
    for (var key in toFilter) {
      if (item[key] === undefined || item[key] != toFilter[key])
        return false
    }
    return true
  })
  console.log(tofilterMessage)

  // Merging the filtered messages together. 
  const mergedMessages = [...filteredMessage, ...tofilterMessage]
  console.log(mergedMessages)


  // Sorting messages by time - newest message to appear at the bottom.
  const sortMessages = mergedMessages.sort(function (a, b) {
    const dateA = new Date(a.created_at), dateB = new Date(b.created_at)
    return dateA - dateB
  })


  console.log(sortMessages)

  // Function POST message data to API
  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/message', userMessage, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        if (resp.data.errors) {
          return console.log(resp.data.errors)
        }
      })
  }

  return <div>
    <h1 className="testing">MESSAGES!!</h1>
    {sortMessages.map((fromMessage, index) => {
      return <div className="fromMessage" key={index}>
        <p >{fromMessage.from_user.first_name}</p>
        <p>{fromMessage.content}</p>
      </div>
    })}

    <form onSubmit={handleSubmit}>
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea
              className="textarea"
              placeholder="Send message"
              onChange={handleChange}
              value={userMessage.content}
              name="context"
            >
              {text}
            </textarea>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button>
              send
            </button>
          </p>
        </div>
      </div>
    </form>


  </div>

}

export default Message