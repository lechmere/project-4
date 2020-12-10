import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { getUserId } from '../lib/auth'

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
    axios.get(`api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}}` }
    })
      .then(resp => {
        updateUserInfo(resp.data)
        console.log(resp.data)
      })
  }, [])

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

  return <div>

    <img className="profile-image" src={userInfo.image} alt={'user profile image'} />
    <button
      className="button-green"
      onClick={handleUpload}
    >
      Click to upload
    </button>

    <input
      placeholder={userInfo.first_name}
      onChange={handleChange}
      value={formData.first_name}
      name="first_name"
    />

    <input
      placeholder={userInfo.email}
      onChange={handleChange}
      value={formData.email}
      name="email"
    />

    <input
      placeholder="******"
      onChange={handleChange}
      value={formData.password}
      name="password"
    />

    <input
      placeholder={userInfo.bio}
      onChange={handleChange}
      value={formData.bio}
      name="bio"
    />

    <input
      placeholder={userInfo.quote}
      onChange={handleChange}
      value={formData.quote}
      name="quote"
    />

    <input
      placeholder={userInfo.religion}
      onChange={handleChange}
      value={formData.religion}
      name="religion"
    />

    <button onClick={handleSubmit}>Update</button>
  </div>
}

export default EditProfile










// import axios from 'axios'
// import React, { useState } from 'react'


// const Image = () => {

//   const [image, setImage] = useState('')

//   function handleUpload() {
//     window.cloudinary.createUploadWidget(
//       {
//         cloudName: 'kindlr', //!this will be your cloud name
//         uploadPreset: 'default_kindlr', //!this will be your upload presets
//         cropping: true
//       },
//       (err, result) => {
//         if (result.event !== 'success'){
//           return
//         }
//         // axios.put('/api/users/1', { image: result.info.secure_url }, {
//         //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
//         // })
//           console.log(result.info.url)
//       }
//     ).open()
//   }

//   console.log(image)
//   return <>
//   <img src={image.url}/>
//     <button onClick={handleUpload}
//     >Upload Image
//     </button>
//   </>

// }

// export default Image