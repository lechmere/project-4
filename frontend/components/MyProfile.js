import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import edit from '../images/edit.svg'

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
        <div className="edit-cover">
          <img className="profile-image" src={viewCurrentUser.image} alt={'user-profile-image'} />
          <h1>{viewCurrentUser.first_name}, {viewCurrentUser.age}</h1>
          {/* {getUserId()(viewProfile.id) && to={'/editprofile'}} */}
          <img className="edit-icon" src={edit} alt={'back-arrow'} />
        </div>
          <div className="details">
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