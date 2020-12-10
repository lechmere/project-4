import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import edit from '../images/edit.svg'
import Menu from '../components/Menu'
import { Link } from 'react-router-dom'

const viewCurrentUser = (props) => {

  const userId = getUserId()

  const [viewCurrentUser, updateCurrentUser] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateCurrentUser(resp.data)
      })
  }, [])

  return <section className="bg-color">
    <section className="page-container">
      <section className="message-box">
      <div className="overflow-fade-edit">
        </div>
        <div className="edit-cover">
          <img className="profile-image" src={viewCurrentUser.image} alt={'user-profile-image'} />
          <h1>{viewCurrentUser.first_name}, {viewCurrentUser.age}</h1>
          {getUserId(viewCurrentUser.id) &&
            <Link to={'/editprofile'}>
              <img className="edit-icon" src={edit} alt={'back-arrow'} />
            </Link>}

        </div>

        <hr className="edit-profile-hr"></hr>
        <div className="dm-myprofile-scroll">

          <div className="message-content profile-content">
            <h2>{viewCurrentUser.bio}</h2>
            <h3>Bio</h3>
          </div>

          <div className="message-content profile-content">
            <h2>{viewCurrentUser.quote}</h2>
            <h3>About Me</h3>
          </div>

          <div className="message-content profile-content">
            <h2>{viewCurrentUser.postcode}</h2>
            <h3>Location</h3>
          </div>

          <div className="message-content profile-content">
            <h2>{viewCurrentUser.children}</h2>
            <h3>Children</h3>
          </div>

          <div className="message-content profile-content">
            <h2>{viewCurrentUser.employment}</h2>
            <h3>Employment</h3>
          </div>
        </div>

      </section>
    </section>
    <Menu />
  </section>

}
export default viewCurrentUser

