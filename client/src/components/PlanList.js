import React, { useEffect, useState } from 'react';
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
    return <PlanTile key={plan.id} plan={plan} />
  })

  return ( 
    <ul className='plan-list'>
      {planTiles}
    </ul>
  )
}

export default PlanList;