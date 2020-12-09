import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'


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
    axios.put(`/api/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        console.log(resp.data)
        history.push(`/profile/${userId}`)
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
            onChange={handleChange}
            value={formData.first_name}
            name="first_name"
          />
        </div>
{/* 
        <div className="field">
          <label className="editLabel">Last Name</label>
          <input
            className="editInput" 
            type="text"
            onChange={handleChange}
            value={formData.lastname}
            name="lastname"
          />
        </div> */}

        <div className="field">
          <label className="editLabel">Email</label>
          <input
            className="editInput" 
            type="text"
            onChange={handleChange}
            value={formData.email}
            name="email"
          />
        </div>

        <div className="field">
          <label className="editLabel">Password</label>
          <input className="editInput"
            type="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div >

        <div className="field">
          <label className="editLabel">Password Confirmation</label>
          <input className="editInput"
            type="password"
            onChange={handleChange}
            value={formData.passwordConfirmation}
            name="password_confirmation"
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
        <div className="field">
          <label className="editLabel">Your Quote</label>
          <input className="editInput" 
            type="text"
            onChange={handleChange}
            value={formData.quote}
            name="quote"
          />
        </div>
        <div className="field">
          <label className="editLabel">Your Religion</label>
          <input className="editInput" 
            type="text"
            onChange={handleChange}
            value={formData.religion}
            name="religion"
          />
        </div>
        <div className="field">
          <label className="editLabel">Your Relationship Status</label>
          <input className="editInput" 
            type="text"
            onChange={handleChange}
            value={formData.relationship}
            name="relationship"
          />
        </div>
        {/* <div className="field">
          <label className="editLabel">Do you have children?</label>
          <input className="editInput" 
            type="text"
            onChange={handleChange}
            value={formData.children}
            name="children"
          />
        </div>
        <div className="field">
          <label className="editLabel">Your Employment Status</label>
          <input className="editInput" 
            type="text"
            onChange={handleChange}
            value={formData.employment}
            name="employment"
          />
        </div> */}
        <button className="button" type="submit" onClick={handleSubmit}>Save Changes</button>
      </form>
    </main>
  </>
}

export default Edit