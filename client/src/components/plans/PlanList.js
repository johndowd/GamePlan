import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import PlanTile from './PlanTile';

const PlanList = ({ user }) => {
  const [plans, setPlans] = useState([])

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/v1/plans")
      if (!response.ok) {
        console.error(error)
      }
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

  let addNewPlanLink
  if (user) {
    addNewPlanLink = <Link to="/plans/new">Host a new event</Link>
  }

  return (
    <div className='plan-list'>
      <div className='plan-list-header'>
        <h3>Events</h3>
        {addNewPlanLink}
      </div>
      <ul >
        {planTiles}
      </ul>
    </div>

  )
}

export default PlanList;