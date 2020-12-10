import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'

const viewCurrentUser = (props) => {

  const userId = props.match.params.userId

  const [viewCurrentUser, updateCurrentUser] = useState([])
  const token = localStorage.getItem('token')
  const currentUser = getUserId(token)

  useEffect(() => {
    axios.get(`/api/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateCurrentUser(resp.data)
      })
  }, [])

  return <>
    <main>
      <section className="flex-container">
        <div className="display-area">
        <div className="profile">
          <div>
            <img className="img" src={viewCurrentUser.image} alt={viewCurrentUser.first_name} />
          </div>
          <div className="details">
            <h2 className="name">{viewCurrentUser.first_name}</h2>
            <h2 className="age">{viewCurrentUser.age}</h2>
            <h3 className="postcode">Location: </h3>
            <h3 className="postcode">{viewCurrentUser.postcode}</h3>
            <h3 className="bio">{viewCurrentUser.bio}</h3>
            <h3 className="quote">{viewCurrentUser.quote}</h3>
            <h3 className="religion">{viewCurrentUser.religion}</h3>
            <h3 className="religion">Relationship Status: </h3>
            <h3 className="relationship">{viewCurrentUser.relationship}</h3>
            <h3 className="children">Children:</h3>
            <h3 className="children">{viewCurrentUser.children}</h3>
            <h3 className="employment">Employment Status: </h3>
            <h3 className="employment">{viewCurrentUser.employment}</h3>
          </div>
        </div>
        </div>
      </section>
    </main>
  </>
}
export default viewCurrentUser