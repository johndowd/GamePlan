import React from 'react';
import { Link } from 'react-router-dom'

const PlanTile = ({ plan }) => {
  const { id, name, game, date, location, players } = plan
  return (
    <Link to={`/plans/${id}`}>
      <li className="plan-tile callout">
        <img src={game.image_url} />
        <div>
          <p>{date}</p>
          <h4>{name}</h4>
          <p className='cell small-6'>{location} </p>
          <p>{plan.players.length} / {game.max_players} players</p>
        </div>
      </li>
    </Link>
  )
}

export default PlanTile;