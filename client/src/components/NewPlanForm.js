import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import translateServerErrors from '../services/translateServerErrors'
import FormError from './layout/FormError';
import GameSearchField from './GameSearchField';
import SelectedGameTile from './SelectedGameTile';


const NewPlan = ({ user }) => {
  const [formSuccess, setFormSuccess] = useState(false)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [game, setGame] = useState({})

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch("/api/v1/plans", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ ...formData, gameId: game.id })
      })
      if (!response.ok) {
        if (response.status === 422) {
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

  const addSelectedGame = async game => {
    try {
      const response = await fetch("/api/v1/games", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(game)
      })
      if (!response.ok) {
        console.error(response.statusText)
      }
      const body = await response.json()
      setGame(body.game)
    } catch (error) {
      console.error(error)
    }
  }

  const setSelectedGame = (game) => {
    setGame(game)
    if (!game.id) {
      addSelectedGame(game)
    }
  }

  if (formSuccess) {
    return <Redirect to="/plans" />
  }

  let gameSelectComponent
  if (!game.name) {
    gameSelectComponent = <GameSearchField setSelectedGame={setSelectedGame} error={errors["Game Id"]} />
  } else {
    gameSelectComponent = <SelectedGameTile game={game} setGame={setGame} />
  }

  let form
  if (user) {
    form =
      <form className='add-plan-form' onSubmit={handleSubmit}>
        <h4>Add a new plan</h4>
        <label>Name:
          <input
            type="text"
            id="name"
            value={formData.attr}
            onChange={handleChange}
          />
          <FormError error={errors.Name} />
        </label>
        <label>Date:
          <input
            type="text"
            id="date"
            value={formData.attr}
            onChange={handleChange}
          />
        </label>
        <FormError error={errors.Date} />
        <label>Location:
          <input
            type="text"
            id="location"
            value={formData.attr}
            onChange={handleChange}
          />
          <FormError error={errors.Location} />
        </label>
        {gameSelectComponent}
        {errors["Game Id"] ? <FormError error={errors["Game Id"]} /> : ""}
        <button className='button'>Submit</button>
      </form>
  }

  return (
    <div>
      {form}
    </div>
  )
}

export default NewPlan