import React, { useState } from 'react'
import axios from 'axios'
import logo from '../images/white-logo.svg'

// * Standard Login Form (Pre populate?)
// * Once logged in -> Link to Home

const Login = (props) => {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, updateErrors] = useState('')
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
    axios.post('/api/login', formData)
      .then(resp => {
        localStorage.setItem('token', resp.data.token)
        props.history.push('/swipe')
      })
      .then(() => {
        location.reload()
      })
      .catch(error => {
        updateErrors(error)
        return error
      })
  }

  return <main className="bg-color">
    <section className="login-logo">
      <img src={logo} alt={'distance-arrow'} />
    </section>

    <section>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <input className="input-field"
            type="text"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            name="email"
          />
        </div>
        <div className="form-section">
          <input className="input-field"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            name="password"
          />
        </div>
        {errors && <p className="errorMessages" style={{ color: 'red' }}>
          {'Invalid username or password'}
        </p>}
        <a href="/" onClick={handleSubmit}><button className="form-button">LOGIN</button></a>
        <a className="alt-page" href="/register">No account? Register</a>
      </form>
    </section>

  </main>
}

export default Login
