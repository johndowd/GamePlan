import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import PlanTile from './PlanTile';

const PlanList = (props) => {
  const [plans, setPlans]= useState([])

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
    return <Link to={`/plans/${plan.id}`}><PlanTile key={plan.id} plan={plan} /></Link>
  })

  return ( 
    <ul className='plan-list'>
      {planTiles}
    </ul>
  )
}

export default PlanList;