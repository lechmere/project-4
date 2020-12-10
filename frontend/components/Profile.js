import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ViewProfile = ({ userId }) => {

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

  console.log(viewProfile.id)

  return <section className="bg-color">
    <section className="page-container">
      <section className="page-content">
        <div className="edit-cover">
          <img className="profile-image" src={viewProfile.image} alt={'user-profile-image'} />
          <h1>{viewProfile.first_name}, {viewProfile.age}</h1>
        </div>

        <hr className="edit-profile-hr"></hr>
        <div className="dm-inner-scroll">
          <div>
            <div className="message-content profile-content">
              <h2>{viewProfile.bio}</h2>
              <h3 id="modelh3">Bio</h3>
            </div>

            <div className="message-content profile-content">
              <h2>{viewProfile.quote}</h2>
              <h3 id="modelh3">About me</h3>
            </div>
            {/* {/* <div className="message-content profile-content">
              <h2>{viewProfile.postcode}</h2>
              <h3>Location</h3>
            </div> */}



            <div className="message-content profile-content">
              <h2>{viewProfile.employment}</h2>
              <h3 id="modelh3">Employment</h3>
            </div>
          </div>

        </div>
      </section>
    </section>
  </section>
}
export default ViewProfile