import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { getUserId } from '../lib/auth'
// import { useHistory } from 'react-router-dom'
import camera from '../images/camera.svg'
import Menu from '../components/Menu'

const EditProfile = (props) => {
  const token = localStorage.getItem('token')
  const [userInfo, updateUserInfo] = useState({})
  const userId = getUserId()

  // ? Const needed to complete the PUT request.
  const [formData, updateFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    image: '',
    bio: '',
    age: '',
    quote: '',
    religion: '',
    relationship: '',
    children: '',
    employment: ''
  })

  // ? Getting the information for the signed in user user. 
  useEffect(() => {
    axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}}` }
    })
      .then(resp => {
        updateUserInfo(resp.data)
        console.log(resp.data)
      })
  }, [])

  console.log(userInfo)

  // ? Cloudinary function to upload an image. 
  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'kindlr',
        uploadPreset: 'default_kindlr',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        axios.put(`/api/users/${userId}`, { image: result.info.secure_url }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        console.log(result.info.url)

      }
    ).open()
  }

  // ? Function to compile information needed for the PUT request. 
  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`/api/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        console.log(resp.data)
        props.history.push(`/profile/${userId}`)
      })
  }


  return <section className="bg-color">
    <section className="page-container">
      <section className="page-content">
        <div className="edit-cover">
          <img className="profile-image" src={userInfo.image} alt={'user profile image'} />
          <h1>{userInfo.first_name}, {userInfo.age}</h1>
          <button
            className="camera-button" onClick={handleUpload}>
            <img
              className="edit-icon" src={camera} alt={'back-arrow'} />
          </button>
        </div>

        <hr className="edit-profile-hr"></hr>

        <form>


          <div className="edit-form-section">
            <label>Bio</label>
            <input
              className="edit-input-field"
              placeholder={userInfo.bio}
              onChange={handleChange}
              value={formData.bio}
              name="bio"
            />
          </div>

          <div className="edit-form-section">
            <label>Children</label>
            <input
              placeholder={userInfo.children}
              className="edit-input-field"
              type="text"
              onChange={handleChange}
              value={formData.children}
              name="children"
            />
          </div>
          <div className="edit-form-section">
            <label>Employment Status</label>
            <input
              placeholder={userInfo.employment}
              className="edit-input-field"
              type="text"
              onChange={handleChange}
              value={formData.employment}
              name="employment"
            />
          </div>

          <button
            className="edit-profile-button"
            type="submit"
            onClick={handleSubmit}
          >Save
          </button>

        </form>
      </section>
    </section>
    <Menu />
  </section>
}

export default EditProfile
