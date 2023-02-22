import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import PlanTile from '../plans/PlanTile';

const SelectedPlanList = (props) => {

  const gameId = props.match.params.id

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

  useEffect(() => {
    fetchPlans()
  }, [])

  const planTiles = plans.map(plan => {
    return <PlanTile key={plan.id} plan={plan} />
  })

  if (!plans.length) {
    return <Link to={`/plans/new/${gameId}`}><h1>No plans yet! Click here to make one</h1></Link>
  }

  return (
    <ul>
      {planTiles}
    </ul>
  )
}

export default SelectedPlanList;