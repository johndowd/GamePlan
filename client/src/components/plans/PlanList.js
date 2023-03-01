import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import PlanTile from './PlanTile';
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

const PlanList = ({ user }) => {
  const [plans, setPlans] = useState([])
  const [index, setIndex] = useState(0)

  const fetchPlans = async () => {
    const url = `api/v1/plans/find/?index=${index}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        console.error(error)
      }
      const body = await response.json()
      setIndex(index + 2)
      setPlans(plans.concat(body.plans))
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
    addNewPlanLink = <button id="host-button" className='button orange'><Link to="/plans/new">Host a new event</Link></button>
  }

  return (
    <div className='plan-list'>
      <div className='plan-list-header'>
        <h1>Events</h1>
        {addNewPlanLink}
      </div>

      <InfiniteScroll
        dataLength={plans.length}
        next={() => {
          fetchPlans()
        }}
        hasMore={true}
        loader={<button
          className='button'
          onClick={e => window.scrollTo(0, 0)}
        >To Top <FontAwesomeIcon icon={faArrowUp} /></button>}
      >
        <ul >
          {planTiles}
        </ul>
      </InfiniteScroll>
    </div >
  )
}

export default PlanList;