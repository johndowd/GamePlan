import React from 'react';
import { Link } from 'react-router-dom'

const PlanTile = ({ plan }) => {
  const { id, name, game, date, players, playerCount } = plan
  console.log(plan)
  return (
    <Link to={`/plans/${id}`}>
      <li className="plan-tile callout">
        <h4>{name}</h4>
        <div className='grid-x'>
          <p className='cell small-6'>Playing {game} on {date} </p>
          <p className='cell small-6'>{players.length >= playerCount ? "FULL" : ""}</p>
        </div>
      </li>
    </Link>
  )
}

export default PlanTile;