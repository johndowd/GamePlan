import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import PlanTile from './PlanTile';
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import PlanClient from '../../services/apiClient/PlanClient';

const PlanList = (props) => {
  const { user } = props
  const [state, setState] = useState({
    plans: [],
    index: 0
  })

  const getParams = () => {
    const { search } = useLocation()
    const kvp = search.split('=', -1)
    kvp[0] = kvp[0][1]
    const result = { [kvp[0]]: kvp[1] }
    return result
  }

  const params = getParams()

  const fetchPlans = async () => {
    const newPlans = await PlanClient.fetchThreePlans(state.index)
    setState({
      ...state,
      plans: state.plans.concat(newPlans),
      index: state.index + 3
    })
  }

  useEffect(() => {
    fetchPlans(state.index)
  }, [])

  const planTiles = state.plans.map(plan => {
    return <PlanTile key={plan.id} plan={plan} />
  })

  let addNewPlanLink
  if (user) {
    addNewPlanLink = <button id="host-button" className='button orange'><Link to="/plans/new">Host a new game night</Link></button>
  }

  return (
    <div className='content-background'>
      <div className='plan-list-header'>
        <h1>Upcoming Plans</h1>
        {addNewPlanLink}
      </div>

      <InfiniteScroll
        dataLength={state.plans.length}
        next={() => {
          fetchPlans()
        }}
        hasMore={true}
        scrollThreshold={.2}
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