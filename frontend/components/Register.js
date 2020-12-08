import React, { useState } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import Banner from './Banner'

const Register = (props) => {

  const [formData, updateFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    age: '',
    image: '',
    postcode: '',
    bio: ''
  })


  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    updateFormData(data)
  }

  // function handleSubmit(event) {
  //   event.preventDefault()

  //   axios.post('api/register', formData)
  //     .then(resp => {
  //       props.history.push('/')
  //     })
  // }

  return <>
  <Banner />
  <div className="session">
    <div className="left">
    </div>
    <form action="" className="log-in" autoComplete="off">
      <h4 className="title">Tindlr</h4>
      <p className="welcome">Create a new account:</p>

      <div className="field">
        <label className="label">First Name</label>
        <input
          className="input" 
          type="text"
          onChange={handleChange}
          value={formData.first_name}
          name="firstname"
        />
      </div>

      <div className="field">
        <label className="label">Last Name</label>
        <input
          className="input"
          type="text"
          onChange={handleChange}
          value={formData.last_name}
          name="lastname"
        />
      </div>

      <div className="field">
        <label className="label">Username</label>
        <input
          className="input"
          type="text"
          onChange={handleChange}
          value={formData.username}
          name="username"
        />
      </div>
      <div className="field">
        <label className="label">Email</label>
        <input
          className="input"
          type="text"
          onChange={handleChange}
          value={formData.email}
          name="email"
        />
      </div>

      <div className="field">
        <label className="label">Password</label>
        <input className="input"
          type="password"
          onChange={handleChange}
        />
      </div >
      
      <div className="field">
        <label className="label">Password Confirmation</label>
        <input className="input"
          type="password"
          onChange={handleChange}
          value={formData.password_confirmation}
          name="passwordConfirmation"
        />
      </div >

      <div className="field">
        <label className="label">Profile Picture</label>
        <input
          className="input" 
          type="image"
          onChange={handleChange}
          value={formData.image}
          name="image"
        />
      </div>

      <div className="field">
        <label className="label">Age</label>
        <input
          className="input" 
          type="integer"
          onChange={handleChange}
          value={formData.age}
          name="age"
        />
      </div>

      <div className="field">
        <label className="label">Postcode</label>
        <input
          className="input" 
          type="text"
          onChange={handleChange}
          value={formData.postcode}
          name="postcode"
        />
      </div>

      <div className="field">
        <label className="label">Bio</label>
        <input
          className="input" 
          type="text"
          onChange={handleChange}
          value={formData.bio}
          name="bio"
        />
      </div>

      <button className="button" type="submit" >Sign Up</button>
      {<Link to='/' className="discrete">Have an account? Login</Link>}
    </form>
  </div>
  </>
}

export default Register