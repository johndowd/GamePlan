import React from 'react';

const PlanTile = ({ plan }) => {
  const { name, game, date} = plan
  return ( 
    <li className='plan-tile callout'>
      <h4>{name}</h4>
      <p>Playing {game} on {date}</p>
    </li>
  )
}

export default PlanTile;