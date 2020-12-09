import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import camera from '../images/camera.svg'


const Edit = (props) => {
  console.log(props)
  const userId = props.match.params.userId
  let history = useHistory()
  console.log(history)

  const [image, setImage] = useState('')

  const [formData, updateFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
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
  console.log(formData)

  useEffect(() => {
    axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        updateFormData(resp.data)
        console.log(resp.data)
      })
  }, [])


  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: '',
        uploadPreset: '',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        axios.put(`/api/users/${userId}`, { url: result.info.secure_url })
          .then((res) => setImage(res.data))
      }
    ).open()
  }

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
        history.push(`/profile/${userId}`)
      })
  }




  return <section className="bg-color">
    <section className="page-container">
      <section className="page-content">
        <div className="edit-cover">
          <img className="profile-image" src={formData.image} alt={'user-profile-image'} />
          <h1>{formData.first_name}, {formData.age}</h1>
          <button className="camera-button" onClick={handleUpload}><img className="edit-icon" src={camera} alt={'back-arrow'} /></button>
        </div>

        <hr className="edit-profile-hr"></hr>

        <form>

          {/* <div className="form-section">
            <input
              placeholder="Email"
              className="edit-input-field"
              type="text"
              onChange={handleChange}
              value={formData.email}
              name="email"
            />
          </div>

          <div className="form-section">
            <input
              placeholder="Password"
              className="edit-input-field"
              type="password"
              onChange={handleChange}
              value={formData.password}
              name="password"
            />
          </div > */}

          <div className="edit-form-section">
            <label>Bio</label>
            <input
              placeholder="Bio"
              className="edit-input-field"
              type="text"
              onChange={handleChange}
              value={formData.bio}
              name="bio"
            />
          </div>

          <div className="edit-form-section">
            <label>Children</label>
            <input
              placeholder="Children?"
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
              placeholder="Employment Status"
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
  </section>
}

export default Edit