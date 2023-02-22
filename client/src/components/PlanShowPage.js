import React, { useEffect, useState } from 'react';

import EditPlanPage from "./EditPlanPage"
import translateDate from '../services/translateDate';
import UserTile from './UserTile';
import CommentList from './CommentList';
import SimpleMap from './SimpleMap';

const PlanShowPage = ({ user, match }) => {
  const [plan, setPlan] = useState({ players: [], game: {}, owner: {}, comments: [] })
  const [edit, setEdit] = useState(false)

  const fetchPlan = async () => {
    const { id } = match.params
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

  const handleLeave = async () => {
    try {
      const response = await fetch(`/api/v1/signups/${plan.id}`, {
        method: "DELETE"
      })
      if (!response.ok) {
        throw new Error(response.message)
      }
      setPlan({
        ...plan,
        players: plan.players.filter(player => {
          return player.id !== user.id
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  const isCurrentPlayer = () => {
    return plan.players.find(player => player.id == user.id)
  }

  const isAdmin = () => {
    return user?.id == plan.owner.id
  }

  const playerLength = plan.players.length
  const gameSlots = plan.game.max_players
  const slotsLeft = gameSlots - playerLength

  let playerList
  playerList = plan.players.map(player => {
    return <UserTile user={player} small={true} />
  })

  let spotsLeftComponent
  if (slotsLeft == 0) {
    spotsLeftComponent = ""
  } else if (slotsLeft < 2) {
    spotsLeftComponent = <li> {`${slotsLeft} spot left!`} </li>
  } else {
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

  let adminComponent
  if (isAdmin()) {
    adminComponent =
      <a className='button' onClick={e => setEdit(true)}>Edit </a>
  }

  let joinButton
  if (user?.id) {
    if (isCurrentPlayer()) {
      joinButton = <a className='button' onClick={handleLeave}>Leave Game</a>
    } else if (playerLength >= gameSlots) {
      joinButton = <a className='button disabled warning'>Game is full</a>
    } else {
      joinButton = <a className='button' onClick={handleClick}>Click to join this game</a>
    }
  }

  const { tDay, tDate, tTime } = translateDate(plan.date)
  if (edit) {
    return <EditPlanPage plan={plan} user={user} setPlan={setPlan} />
  }

  return (
    <div className='plan-show-page'>
      <h2>{plan.name}</h2>
      <h3>Hosted By: <UserTile user={plan.owner} /></h3>
      <img src={plan.game.image_url} />
      <div className='grid-container'>
        <h3>{tDay}, {tDate}, {tTime} </h3>
        <h3>Location: {plan.location}</h3>
        <h5>{plan.address}</h5>
        {plan?.address ? <SimpleMap address={plan.address} /> : ""}
        {adminComponent}
        <h4> Attendees: </h4>
        {playerListComponent}
        {joinButton}
      </div>
      <CommentList comments={plan.comments} plan={plan} setPlan={setPlan} user={user} />

    </div>
  )
}

export default PlanShowPage;