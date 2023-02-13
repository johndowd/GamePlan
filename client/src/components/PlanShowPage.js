import React, { useEffect, useState } from 'react';

const PlanShowPage = (props) => {
  const [plan, setPlan] = useState({})

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

  const detailComponents = Object.keys(plan).map(attr => {
    return <p>{_.capitalize(attr)}: {plan[attr]}</p>
  })

  return (
  <div className='plan-show'>
    {detailComponents}
  </div>
  )
}

export default PlanShowPage;