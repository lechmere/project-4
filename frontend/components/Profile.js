import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ViewProfile = (props) => {

  const userId = props.match.params.userId

  const [viewProfile, updateViewProfile] = useState({})

  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateViewProfile(resp.data)
      })
  }, [])

  return <>
    <main>
      <section className="flex-container">
        <div className="display-area">
        <div className="profile">
          <div>
            <img className="img" src={viewProfile.image} alt={viewProfile.first_name} />
          </div>
          <div className="details">
            <h2 className="name">{viewProfile.first_name}</h2>
            <h2 className="age">{viewProfile.age}</h2>
            <h3 className="postcode">Location: </h3>
            <h3 className="postcode">{viewProfile.postcode}</h3>
            <h3 className="bio">{viewProfile.bio}</h3>
            <h3 className="quote">{viewProfile.quote}</h3>
            <h3 className="religion">{viewProfile.religion}</h3>
            <h3 className="religion">Relationship Status: </h3>
            <h3 className="relationship">{viewProfile.relationship}</h3>
            <h3 className="children">Children:</h3>
            <h3 className="children">{viewProfile.children}</h3>
            <h3 className="employment">Employment Status: </h3>
            <h3 className="employment">{viewProfile.employment}</h3>
          </div>
        </div>
        </div>
      </section>
    </main>
  </>
}
export default ViewProfile