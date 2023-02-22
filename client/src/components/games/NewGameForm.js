import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import FormError from '../layout/FormError';

const NewGameForm = ({ user }) => {
  const [formData, setFormData] = useState({})
  const [redirect, setRedirect] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const addGame = async () => {
    try {
      const response = await fetch("/api/v1/games", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = {}
          for (const err in body.errors) {
            newErrors[err] = body.errors[err][0].message
          }
          setErrors(newErrors)
        }
        throw new Error(response.message)
      }
      const body = await response.json()
      setRedirect(true)
    } catch (error) {
      console.error(`error in fetch: ${error.message}`)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    addGame()
  }

  if (redirect) {
    return <Redirect to="/" ></Redirect>
  }

  let form
  if (user) {
    form =
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormError error={errors.name} />
        </label>
        <label>Max Players:
          <input
            type="number"
            id='max_players'
            value={formData.max_players}
            onChange={handleChange}
          />
          <FormError error={errors.max_players} />
          <label>Image Url:
            <input
              type="text"
              id='image_url'
              value={formData.image_url}
              onChange={handleChange}
            />
            <FormError error={errors.image_url} />
          </label>
        </label>
        <label>Description:
          <textarea
            type="text"
            id='description'
            value={formData.description}
            onChange={handleChange}
          />
          <FormError error={errors.description} />
        </label>
        <a className='button' onClick={handleSubmit}>Submit</a>
      </form>
  }

  return (
    <div className='grid-container'>
      <h2>Add new game</h2>
      {form}
    </div>
  )
}

export default NewGameForm;