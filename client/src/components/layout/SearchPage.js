import React, { useEffect, useState } from 'react';
import PlanTile from '../PlanTile';

const SearchPage = (props) => {
  const [plans, setPlans] = useState([])
  const { q } = props.match.params

  const fetchPlans = async () => {
    try {
      const response = await fetch(`/api/v1/plans/search/${q}`)
      const body = await response.json()
      setPlans(body.plans)
    } catch (error) {
      console.error(`error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [q])

  const planTiles = plans.map(plan => {
    return <PlanTile key={plan.id} plan={plan} />
  })

  return (
    <div className='grid-container'>
      <h3>Plans</h3>
      <ul>
        {planTiles}
      </ul>
    </div>
  );
}

export default SearchPage;