import React, { useEffect, useState } from 'react';
import EditPlanPage from "./EditPlanPage"
import translateDate from '../../services/translateDate';
import UserTile from '../users/UserTile';
import CommentList from './CommentList';
import SimpleMap from '../Map/SimpleMap';
import PlanClient from '../../services/apiClient/PlanClient';
import SignupClient from '../../services/apiClient/SignupClient';

const PlanShowPage = ({ user, match }) => {
  const [state, setState] = useState({
    plan: {
      players: [],
      game: {},
      owner: {},
      comments: []
    },
    edit: false
  })

  const setPlan = (plan) => {
    setState({
      ...state, plan
    })
  }

  const fetchPlan = async () => {
    const { id } = match.params
    const plan = await PlanClient.fetchPlanById(id)
    return setPlan(plan)
  }

  useEffect(() => {
    fetchPlan()
  }, [])

  const joinGame = async () => {
    const newPlayers = await SignupClient.addSignup(state.plan.id)
    if (!newPlayers?.error) {
      setPlan({
        ...state.plan,
        players: state.plan.players.concat(user)
      })
    }
  }

  const handleClick = async (event) => {
    const idArray = state.plan.players.map(player => player.id)
    if (idArray.includes(user.id)) {
      leaveGame()
    } else {
      joinGame()
    }
  }

  const leaveGame = async () => {
    const success = await SignupClient.deleteSignup(state.plan.id)
    if (success) {
      setPlan({
        ...state.plan,
        players: state.plan.players.filter(player => {
          return player.id !== user.id
        })
      })
    }
  }

  const isCurrentPlayer = () => {
    return state.plan.players.find(player => player.id == user.id)
  }

  const isAdmin = () => {
    return user?.id == state.plan.owner.id
  }

  const playerLength = state.plan?.players.length
  const gameSlots = state.plan?.game.max_players
  const slotsLeft = gameSlots - playerLength

  let playerList
  playerList = state.plan.players.map(player => {
    return <UserTile
      key={player.id}
      user={player}
      small={true}
    />
  })

  let spotsLeftComponent
  if (slotsLeft == 0) {
    spotsLeftComponent = ""
  } else if (slotsLeft < 2) {
    spotsLeftComponent = <p> {`${slotsLeft} spot left!`} </p>
  } else {
    spotsLeftComponent = <p> {`${slotsLeft} spots left!`} </p>
  }

  let playerListComponent
  if (playerLength > 0) {
    playerListComponent =
      <>
        <ul className='player-list'>
          {playerList}
        </ul>
        <br />
        {spotsLeftComponent}
      </>

  }

  let adminComponent
  if (isAdmin()) {
    adminComponent =
      <div className='centered'>
        <a id="edit" className='button' onClick={e => setEdit(true)}>Edit Plan</a>
      </div>
  }

  let joinButton
  if (user?.id) {
    if (isCurrentPlayer()) {
      joinButton = <a id="edit" className='button' onClick={handleClick}>Leave Game</a>
    } else if (playerLength >= gameSlots) {
      joinButton = <a className='button disabled warning'>Game is full</a>
    } else {
      joinButton = <a className='button' onClick={handleClick}>Click to join this game</a>
    }
  }

  const { tDay, tDate, tTime } = translateDate(state.plan.date)
  if (state.edit) {
    return <EditPlanPage plan={plan} user={user} setPlan={setPlan} />
  }

  let descriptionComponent
  if (state.plan.game.description) {
    descriptionComponent = (
      <div className='plan-show-description'>
        <h2>{state.plan.game.name}</h2>
        <p>{state.plan.game.description}</p>
      </div>
    )
  }

  return (
    <div className='white-background content-background '>
      <div className='plan-show-page'>
        <h1>{state.plan.name}</h1>
        <div className='plan-tile-top-row'>
          <h5>{tDay}, {tDate}, {tTime} </h5>
          <p>Hosted By
            <a href={`/users/${state.plan.owner.username}`}>
              <b>&nbsp; {state.plan.owner.username}
                <img className={`plan-tile-top-row ${screen.width > 550 ? 'grid-x' : ''}`} src={state.plan.owner.image_url} />
              </b>
            </a>
          </p>
        </div>
        <img className='' src={state.plan.game.image_url} />
        <div className='plan-details'>
          <div className=''>
            <h2>Location</h2>
            <h3>@ {state.plan.location}</h3>
            <h5>{state.plan.address}</h5>
            {state.plan?.address ? <SimpleMap address={state.plan.address} /> : ""}
          </div>
          <div className='cell small-6'>
            <h2> Attendees </h2>
            {playerListComponent}
            {joinButton}
          </div>
          {adminComponent}
        </div>
        {descriptionComponent}
        <CommentList comments={state.plan.comments} plan={state.plan} setPlan={setPlan} user={user} />
      </div>
    </div >
  )
}

export default PlanShowPage;