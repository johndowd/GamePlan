import { pullAllBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import getCurrentUser from '../services/getCurrentUser';

const PlanShowPage = (props) => {
  const [plan, setPlan] = useState({ players: [], owner: {} })
  const [user, setUser] = useState({})

  const fetchPlan = async () => {
    const { id } = props.match.params
    try {
      const response = await fetch(`/api/v1/plans/${id}`)
      const body = await response.json()
      setPlan(body.plan)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUser = async () => {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
  }

  useEffect(() => {
    fetchPlan(),
      fetchUser()
  }, [])

  const handleClick = async (event) => {
    try {
      const response = await fetch(`/api/v1/signups`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ planId: plan.id, userId: user.id })
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          throw new Error(body.error)
        }
      }
      setPlan({
        ...plan,
        players: [...plan.players, user]
      })
    } catch (error) {
      console.error(error)
    }
  }

  const isCurrentPlayer = () => {
    let isPlayer = false
    plan.players.forEach(player => {
      user.id == player.id ? isPlayer = true : null
    })
    return isPlayer
  }

  let playerList, playerListComponent
  const slotsLeft = plan.playerCount - plan.players.length
  if (plan.players.length > 0) {
    playerList = plan.players.map(player => {
      return <li key={player.username}>{player.username}</li>
    })
    playerListComponent =
      <ul>
        {playerList}
        {slotsLeft
          ? <li>{slotsLeft} spot{slotsLeft ? "s" : ""} left!</li> : ""}
      </ul>
  }

  let joinButton
  if (user?.id) {
    if (isCurrentPlayer()) {
      joinButton = <a className='button disabled'>Already joined this game</a>
    } else if (plan.players.length >= plan.playerCount) {
      joinButton = <a className='button disabled warning'>Game is full</a>
    } else {
      joinButton = <a className='button' onClick={handleClick}>Click to join this game</a>
    }
  }

  return (
    <div className='plan-show'>
      <h2>{plan.name}</h2>
      <h4>Genre: {plan.genre}</h4>
      <h4>Created By: {plan.owner.username}</h4>
      <h4>Players: {plan.playerCount} Max</h4>
      {playerListComponent}
      {joinButton}
    </div>
  )
}

export default PlanShowPage;