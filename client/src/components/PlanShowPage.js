import React, { useEffect, useState } from 'react';

const PlanShowPage = (props) => {
  const [plan, setPlan] = useState({ players: [], game: {}, owner: {} })
  const { user } = props

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

  useEffect(() => {
    fetchPlan()
  }, [])

  const handleClick = async (event) => {
    try {
      const response = await fetch(`/api/v1/signups`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ planId: plan.id })
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
    return plan.players.find(player => player.id == user.id )
  }


  const playerLength = plan.players.length
  const gameSlots = plan.game.max_players
  const slotsLeft = gameSlots - playerLength

  let playerList
  playerList = plan.players.map(player => {
    return <li key={player.username}>{player.username}</li>
  })

  let spotsLeftComponent
  if(slotsLeft == 0) {
    spotsLeftComponent = ""  
  }else if(slotsLeft < 2) {
    spotsLeftComponent = <li> {`${slotsLeft} spot left!`} </li>
  }else {
    spotsLeftComponent = <li> {`${slotsLeft} spots left!`} </li>
  }

  let playerListComponent
  if (playerLength > 0) {
    playerListComponent =
      <ul>
        {playerList}
        {spotsLeftComponent}
    </ul>
  }

  let joinButton
  if (user?.id) {
    if (isCurrentPlayer()) {
      joinButton = <a className='button disabled'>Already joined this game</a>
    } else if (playerLength >= gameSlots) {
      joinButton = <a className='button disabled warning'>Game is full</a>
    } else {
      joinButton = <a className='button' onClick={handleClick}>Click to join this game</a>
    }
  }

  return (
    <div className='plan-show'>
      <h2>{plan.name}</h2>
      <h4>Created By: {plan.owner.username}</h4>
      <h4>Game: {plan.game.name}</h4>
      <h4>Date: {plan.date}</h4>
      <h4>Max # of Players: {plan.game.max_players}</h4>
      {playerListComponent}
      {joinButton}
      <img src={plan.game.image_url} />
    </div>
  )
}

export default PlanShowPage;