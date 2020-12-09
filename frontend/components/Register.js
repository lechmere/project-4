import React, { useState } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import logo from '../images/white-logo.svg'

const Register = () => {

  const [formData, updateFormData] = useState({
    first_name: '',
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

  return <main className="bg-color">
    <section className="login-logo">
      <img src={logo} alt={'distance-arrow'} />
    </section>

    <form>

      <div className="form-section-register">
        <input
          className="input-field"
          type="text"
          onChange={handleChange}
          value={formData.first_name}
          name="firstname"
          placeholder="First Name"
        />
      </div>


      <div className="form-section-register">
        <input
          className="input-field"
          type="text"
          onChange={handleChange}
          value={formData.email}
          name="email"
          placeholder="Email"
        />
      </div>

      <div className="form-section-register">
        <input
          className="input-field"
          type="password"
          onChange={handleChange}
          placeholder="Password"
        />
      </div >

      <div className="form-section-register">
        <input
          className="input-field"
          type="password"
          onChange={handleChange}
          value={formData.password_confirmation}
          name="passwordConfirmation"
          placeholder="Password Confirmation"
        />
      </div >

      <div className="form-section-register">
        <input
          className="input-field"
          type="text"
          onChange={handleChange}
          value={formData.image}
          name="image"
          placeholder="Selfie"
        />
      </div>

      <div className="form-section-register">
        <input
          className="input-field"
          type="integer"
          onChange={handleChange}
          value={formData.age}
          name="age"
          placeholder="Age"
        />
      </div>

      <div className="form-section-register">
        <input
          className="input-field"
          type="text"
          onChange={handleChange}
          value={formData.postcode}
          name="postcode"
          placeholder="Postcode"
        />
      </div>

      <div className="form-section-register">
        <input
          className="input-field"
          type="text"
          onChange={handleChange}
          value={formData.bio}
          name="bio"
          placeholder="Bio"
        />
      </div>
      <button className="form-button" type="submit" >Sign Up</button>

<a className="alt-page" href="/login">Have an Account? Login</a>

    </form>



  </main>
}

export default Register