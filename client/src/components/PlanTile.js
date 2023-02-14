import React from 'react';

const PlanTile = ({ plan }) => {
  const { name, game, date, players, playerCount} = plan
  
  return ( 
    <li className="plan-tile callout">
      <h4>{name}</h4>
      <div className='grid-x'>
        <p className='cell small-6'>Playing {game} on {date} </p>
        <p className='cell small-6'>{players.length >= playerCount ? "FULL" : ""}</p>
      </div>
    </li>
  )
}

export default PlanTile;