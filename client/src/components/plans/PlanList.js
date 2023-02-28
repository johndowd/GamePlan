import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import PlanTile from './PlanTile';
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

const PlanList = ({ user }) => {
  const [plans, setPlans] = useState([])
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('')

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

  const searchPlans = async () => {
    try {
      const url = `api/v1/plans/find/?search=${search}`
      const response = await fetch(url)
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
    addNewPlanLink = <button id="host-button" className='button orange'><Link to="/plans/new">Host a new event</Link></button>
  }

  const downArrow = <FontAwesomeIcon icon={faArrowDown} />

  return (
    <div className='plan-list'>
      <div className='plan-list-header'>
        <h1>Events</h1>
        {addNewPlanLink}
      </div>
      <div className='buttons-container row'>
        <button onClick={() => { }} className='button'>Sort By Coming Soon {downArrow}</button>
        <button onClick={() => { }} className='button'>Sort By Game {downArrow}</button>
        <label>
          <input
            id='search'
            type='text'
            value={search}
            placeholder='search...'
            onChange={e => {
              setSearch(e.currentTarget.value)
            }}
          />
          <button className='button' onClick={searchPlans}>Search</button>
        </label>

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
    </div>
  )
}

export default PlanList;