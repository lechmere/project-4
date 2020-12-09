import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { getUserId } from '../lib/UserToken'

const ViewProfile = (props) => {

  const userId = props.computedMatch.params.userId

  const [viewProfile, updateViewProfile] = useState({})
  const [viewCurrentUser, updateCurrentUser] = useState([])

  const token = localStorage.getItem('token')
  const currentUser = getUserId(token)

  useEffect(() => {
    axios.get(`/api/profile/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateViewProfile(resp.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`/api/profile/${currentUser}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateCurrentUser(resp.data)
        if (!resp.data.friends) {
          return
        } else {
          for (let i = 0; i < resp.data.friends.length; i++) {
            if (resp.data.friends[i]._id === userId.toString()) {
              updateFriend('friend')
            }
          }
        }
      })
  }, [])

  if (!viewProfile.user) {
    return <>
      <Banner />
      <main className="homepage">
        <div className="display-area">
          <h1 className="loading">Loading...</h1>
        </div>
      </main>
    </>
  }
  return <>
    <main>
      <section className="flex-container">
        <div className="display-area">
        <div className="profile">
          <div>
            <img className="img" src={viewProfile.user.image} alt={viewProfile.user.firstname} />
          </div>
          <div className="details">
            <h2 className="name">{viewProfile.user.firstname} {viewProfile.user.lastname}</h2>
            <h2 className="age">{viewProfile.user.age}</h2>
            <h2 className="postcode">{viewProfile.user.postcode}</h2>
            <h3 className="bio">{viewProfile.bio}</h3>
          </div>
        </div>
        </div>
      </section>
    </main>
  </>
}
export default ViewProfile