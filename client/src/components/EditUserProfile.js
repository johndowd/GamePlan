import React, { useState } from 'react';

const EditUserProfile = ({ user, userProfile, setUserProfile }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email
  })

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleSubmit = () => {

  }

  if (user.id !== userProfile.id) {
    return <p> not authorized</p>
  }

  return (
    <div className='grid-container'>
      <label>Username:
        <input
          type="text"
          id='email'
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label>Email:
        <input
          type="text"
          id='email'
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <div className='edit-delete'>
        <button className='button'>Update</button>
      </div>
    </div>
  )
}

export default EditUserProfile;