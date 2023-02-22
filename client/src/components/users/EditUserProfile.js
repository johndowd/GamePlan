import React, { useState } from 'react';
import Dropzone from 'react-dropzone'

const EditUserProfile = ({ user, userProfile, setUserProfile }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    image_url: user.image_url
  })

  const [redirect, setRedirect] = useState(false)
  const [imageData, setImageData] = useState({})
  const [imagePreview, setImagePreview] = useState({
    preview: ""
  })

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }


  const handleUpload = async (event) => {
    event.preventDefault()
    const imageBody = new FormData()
    imageBody.append("image", imageData.image)
    try {
      const response = await fetch(`/api/v1/users/${user.id}/profile-image`, {
        method: "POST",
        headers: {
          "Accept": "image/jpeg"
        },
        body: imageBody
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const body = await response.json()
      setFormData({
        ...formData, image_url: body.image_url
      })
      setImagePreview({})
    } catch (error) {
      console.error(error)
    }
  }

  const handleImageUpload = (acceptedImage) => {
    setImageData({ image: acceptedImage[0] })
    setImagePreview({
      preview: URL.createObjectURL(acceptedImage[0])
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formData)
      })
      const body = await response.json()
      setRedirect(true)
    } catch (error) {
      console.error(error)
    }
  }

  if (user.id !== userProfile.id) {
    return <p> not authorized</p>
  }

  let previewComponent
  let uploadButton = <p className='button'>Click to upload</p>
  let confirmButton = ""
  if (imagePreview.preview) {
    previewComponent = <img src={imagePreview.preview} alt="image-preview" />
    uploadButton = ""
    confirmButton = <p className='button warning' onClick={handleUpload}>Click to confirm upload</p>
  }

  let redirectComponent
  if (redirect) {
    location.href = "/"
  }

  return (
    <div className='grid-container'>
      {redirectComponent}
      <label>Username:
        <input
          type="text"
          id='username'
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
      <label>Profile Image:<br></br>
        {confirmButton}
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {uploadButton}
              </div>
            </section>
          )}
        </Dropzone>
        {previewComponent}
      </label>
      <div className='edit-delete'>
        <button className='button' onClick={handleSubmit}>Update</button>
      </div>
    </div>
  )
}

export default EditUserProfile;