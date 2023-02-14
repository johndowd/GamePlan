import React from 'react';
import { Link } from 'react-router-dom'

const PlanTile = ({ plan }) => {
  const { id, name, game, date} = plan
  return (
    <Link to={`/plans/${id}`}>
    <li className='plan-tile callout'>
      <h4>{name}</h4>
      <p>Playing {game} on {date}</p>
    </li>
    </Link> 
  )
}

export default PlanTile;