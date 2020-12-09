import React, { useState, useEffect } from 'react'
import Toggle from 'react-toggle'
import { useHistory } from "react-router-dom";
import axios from 'axios'


const Edit = (props) => {
  console.log(props)
  const userId = props.computedMatch.params.userId
  let history = useHistory()
  console.log(history)
  const [image, setImage] = useState('')

  const [formData, updateFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    firstname: '',
    lastname: '',
    image: '',
    bio: '',
    age: ''
  })
  console.log(formData)

  // useEffect(() => {
  //   console.log(userId)
  //   axios.get(`/api/profile/${userId}`, {
  //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //   })
  //     .then(resp => {
  //       updateFormData(resp.data)
  //       console.log(resp.data)
  //     })
  // }, [])

  useEffect(() => {
    axios.get(`/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(resp => {
      updateUserData(resp.data)
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
        axios.put(`/api/user/${userId}`, { url: result.info.secure_url })
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

  // function handleUserChange(event) {
  //   const name = event.target.name
  //   const value = event.target.value

  //   const data = {
  //     ...userData,
  //     [name]: value
  //   }

  //   updateUserData(data)
  // }

  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`/api/profile/editprofile/${userId}`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    axios.put(`/api/user/edituser/${userId}`, userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        console.log(resp.data)
        history.push(`/profile/users/${userId}`)
      })
  }

  // if ((!formData.user)||(!userData.firstname)) {
  //   return <>
  //     <Banner />
  //     <main className="homepage">
  //       <div className="display-area">
  //         <h1 className="loading">Loading...</h1>
  //       </div>
  //     </main>
  //   </>
  // }

  return <>
    <main className="editSession">
      <form action="" className="edit" autoComplete="off">

        <div className="field">
          <img src={formData.image} className="editInput" />
          <button onClick={handleUpload}>Upload Image</button>
        </div>

        <div className="field">
          <label className="editLabel">First Name</label>
          <input
            className="editInput" 
            type="text"
            onChange={handleUserChange}
            value={formData.firstname}
            name="firstname"
          />
        </div>

        <div className="field">
          <label className="editLabel">Last Name</label>
          <input
            className="editInput" 
            type="text"
            onChange={handleUserChange}
            value={formData.lastname}
            name="lastname"
          />
        </div>

        <div className="field">
          <label className="editLabel">Email</label>
          <input
            className="editInput" 
            type="text"
            onChange={handleUserChange}
            value={formData.email}
            name="email"
          />
        </div>

        <div className="field">
          <label className="editLabel">Password</label>
          <input className="editInput"
            type="password"
            onChange={handleUserChange}
            value={formData.password}
          />
        </div >

        <div className="field">
          <label className="editLabel">Password Confirmation</label>
          <input className="editInput"
            type="password"
            onChange={handleUserChange}
            value={formData.passwordConfirmation}
            name="passwordConfirmation"
          />
        </div >
        <div className="field">
          <label className="editLabel">Your Bio</label>
          <input className="editInput" 
            type="text"
            onChange={handleChange}
            value={formData.bio}
            name="bio"
          />
        </div>
        <button className="button" type="submit" onClick={handleSubmit}>Save Changes</button>
      </form>
    </main>
  </>
}

export default Edit