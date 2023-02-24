import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import PlanTile from './PlanTile';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

const PlanList = ({ user }) => {
  const [plans, setPlans] = useState([])
  const [showPlans, setShowPlans] = useState([])
  const [search, setSearch] = useState('')

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/v1/plans")
      if (!response.ok) {
        console.error(error)
      }
      const body = await response.json()
      setPlans(body.plans)
      setShowPlans(body.plans)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  const sortByComingSoon = () => {
    const currentDate = new Date()
    const plansAfterCurrentDate = showPlans.filter(plan => {
      return new Date(plan.date) > currentDate
    })
    const sortedPlans = plansAfterCurrentDate.sort((plan1, plan2) => {
      const date1 = new Date(plan1.date)
      const date2 = new Date(plan2.date)
      return (date1 > date2 ? 1 : -1)
    })
    setShowPlans(sortedPlans)
  }

  const sortByGame = () => {
    const sortedPlans = showPlans.sort((plan1, plan2) => {
      const game1 = plan1.game.name
      const game2 = plan2.game.name
      return (game1 > game2 ? 1 : -1)
    })
    setShowPlans([...sortedPlans])
  }

  const searchPlans = () => {
    const filteredPlans = plans.filter(plan => {
      for (const key in plan) {
        if (typeof plan[key] == 'string') {
          if (plan[key].toLowerCase().includes(search.toLowerCase())) {
            return plan
          }
        }
      }
      const { game } = plan
      for (const key in game) {
        if (typeof game[key] == 'string') {
          if (game[key].toLowerCase().includes(search.toLowerCase())) {
            return plan
          }
        }
      }
      const { players } = plan
      for (const player of players) {
        if (player.username.toLowerCase().includes(search.toLowerCase())) {
          return plan
        }
      }
    })
    setShowPlans(filteredPlans)
  }

  const hideFullGames = () => {
    const filteredPlans = showPlans.filter(plan => {
      if (plan.players.length < plan.game.max_players) {
        return plan
      }
    })
    setShowPlans(filteredPlans)
  }

  useEffect(() => {
    searchPlans()
  }, [search])

  const planTiles = showPlans.map(plan => {
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
        <button onClick={sortByComingSoon} className='button'>Sort By Coming Soon {downArrow}</button>
        <button onClick={sortByGame} className='button'>Sort By Game {downArrow}</button>
        <button onClick={hideFullGames} className='button'>Hide full {downArrow}</button>
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
        </label>

      </div>
      <ul >
        {planTiles}
      </ul>
    </div>
  )
}

export default PlanList;