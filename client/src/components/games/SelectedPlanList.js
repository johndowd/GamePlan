import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import PlanTile from '../plans/PlanTile';

const SelectedPlanList = (props) => {

  const gameId = props.match.params.id
  const [game, setGame] = useState({})
  const [plans, setPlans] = useState([])

  const fetchPlans = async () => {
    try {
      const response = await fetch(`/api/v1/games/${gameId}/plans`)
      const body = await response.json()
      setPlans(body.plans)
    } catch (error) {
      console.error(error)
    }
  }

  const getGame = async () => {
    try {
      const response = await fetch(`/api/v1/games/${gameId}`)
      const body = await response.json()
      setGame(body.game)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPlans()
    getGame()
  }, [])

  const planTiles = plans.map(plan => {
    return <PlanTile key={plan.id} plan={plan} />
  })

  let gameHeader
  if (!plans.length) {
    gameHeader =
      <div>
        <Link to={`/plans/new/${gameId}`}><h1 className='plan-list'>No plans for {game.name} yet! </h1>

          <button className='button'>Click here to make one </button></Link>
      </div >
  } else {
    gameHeader = <h1>Plans being made for {game.name}</h1>
  }

  return (
    <div className='plan-list content-background'>
      {gameHeader}
      <ul>
        {planTiles}
      </ul>
    </div>
  )
}

export default SelectedPlanList;