import React, { useState } from 'react';
import _ from 'lodash'
import { Redirect } from 'react-router-dom';

const NewPlan = () => {
  const [formSuccess, setFormSuccess] = useState(false)
  const [formData, setFormData] = useState({})

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
      const body = await response.json()
      setFormSuccess(true)
      if(!response.ok) {
        if(response.status === 422) {
          console.error(response.statusText)
        }
      }

    } catch (error) {
      console.error(error)
    }
  }

  const attributes = ['name', 'game', 'genre', 'maxPlayers', 'location', 'date']
  const inputComponents = attributes.map(attr => {
    return (
      <label key={attr}>{_.capitalize(attr)}:
        <input 
          type="text" 
          id={attr} 
          value={formData.attr} 
          onChange={handleChange} />
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