import React, { useState } from 'react';
import _ from 'lodash'
import { Redirect } from 'react-router-dom';
import translateServerErrors from '../services/translateServerErrors'
import FormError from './layout/FormError';


const NewPlan = () => {
  const [formSuccess, setFormSuccess] = useState(false)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    setFormData({
      ...formData,
        [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch("/api/v1/plans",{
        method: "POST",
        headers: new Headers({
          "Content-Type":"application/json"
        }),
        body: JSON.stringify(formData)
        })
      if (!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        }
        throw new Error(response.statusText)
      }
      setFormSuccess(true)
    } catch (error) {
      console.error(error)
    }
  }

  console.log(errors)

  const attributes = ['name', 'game', 'genre', 'location', 'date', 'players']
  const inputComponents = attributes.map(attr => {
    const capitalizedAttr = _.capitalize(attr)
    return (
      <label key={attr}>{capitalizedAttr}:
        <input 
          type="text" 
          id={attr} 
          value={formData.attr} 
          onChange={handleChange} />
      <FormError error={errors[capitalizedAttr]} />
      </label>
    )
  })

  if (formSuccess) {
    return <Redirect to="/plans" />
  }

  return ( 
  <form className='add-plan-form' onSubmit={handleSubmit}>
    <h4>Add a new plan</h4>
    {inputComponents}
    <button className='button'>Submit</button>
  </form> 
  );
}

export default NewPlan