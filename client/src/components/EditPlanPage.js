import React, { useEffect, useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

import GameSearchField from './GameSearchField';
import SelectedGameTile from './SelectedGameTile';
import FormError from './layout/FormError';
import PlanShowPage from './PlanShowPage';

const EditPlanForm = ({ user, plan, setPlan }) => {
  const [formSuccess, setFormSuccess] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [game, setGame] = useState(plan.game)
  const [formData, setFormData] = useState({
    name: plan.name,
    date: plan.date,
    location: plan.location
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleSubmit = async (event) => {
    try {
      const response = await fetch(`/api/v1/plans/${plan.id}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ ...formData, gameId: game.id })
      })
      const body = await response.json()
      console.log(body);
      setFormSuccess(true)
    } catch (error) {
      console.error(`error in fetch: ${error}`)
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/plans/${plan.id}`, {
        method: "DELETE"
      })
      const body = await response.json()
      if (body.success) {
        return setDeleteSuccess(true)
      }
      throw new Error(body)
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

  let gameSelectComponent
  if (!game.name) {
    gameSelectComponent = <GameSearchField setSelectedGame={setSelectedGame} error={errors["Game Id"]} />
  } else {
    gameSelectComponent = <SelectedGameTile game={game} setGame={setGame} />
  }

  if (deleteSuccess) {
    return <Redirect to="/plans" />
  }

  if (formSuccess) {
    return <Route exact path="/plans/:id"
      render={props => <PlanShowPage {...props} user={user} />} />
  }

  let form
  if (user.id == plan.owner.id) {
    form =
      <form className='grid-container' onSubmit={handleSubmit}>
        <h4>Edit plan ({plan.id}):</h4>
        <label>Name:
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormError error={errors.Name} />
        </label>
        <label>Date:
          <input
            type="text"
            id="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <FormError error={errors.Date} />
        <label>Location:
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleChange}
          />
          <FormError error={errors.Location} />
        </label>
        {gameSelectComponent}
        {errors["Game Id"] ? <FormError error={errors["Game Id"]} /> : ""}
        <button className='button'>Submit</button>
        <button className='button alert' onClick={handleDelete}>Delete</button>
      </form>
  } else {
    return <p>Not authorized</p>
  }

  return (
    <div>
      {form}
    </div>
  )
}

export default EditPlanForm