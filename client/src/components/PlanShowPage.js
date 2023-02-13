import { pullAllBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import getCurrentUser from '../services/getCurrentUser';

const PlanShowPage = (props) => {
  const [plan, setPlan] = useState({})
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
          "Content-Type":"application/json"
        }),
        body: JSON.stringify({ planId: plan.id, userId: user.id })
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          throw new Error(body.error)
        }
      }
      const body = await response.json()
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
    if(plan.players){
      plan.players.forEach(player => {
        user.id==player.id ? isPlayer = true : null
      })
    }
    return isPlayer
  }
    
  let playerList, playerListComponent
  if (plan.players) {
    playerList = plan.players.map(player => {
      return <li key={player.id}>{player.username}</li>
    })
    playerListComponent =
        <ul>
          {playerList}
          <li>{plan.playerCount - plan.players.length} spots left!</li>
        </ul>
    }

  let joinButton = "Need to be logged in to join games!"
  if(user?.id){
    if(isCurrentPlayer()){
      joinButton = <a className='button disabled'>Already joined this game</a>
    }else if(plan?.players?.length > plan.playerCount){
      joinButton = <a className='button disabled warning'>Game is full</a>
    }else {
      joinButton = <a className='button' onClick={handleClick}>Click to join this game</a>
    }
  }

  return (
    <div className='plan-show'>
      <h2>{plan.name}</h2>
      <h4>Genre: {plan.genre}</h4>
      <h4>Players:</h4>
      {playerListComponent}
      {joinButton}
    </div>
  )
}

export default PlanShowPage;