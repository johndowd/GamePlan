import React from 'react';
import { Link } from 'react-router-dom'
import translateDate from '../services/translateDate';

const PlanTile = ({ plan }) => {
  const { id, name, game, date, location, players } = plan
  const { tDay, tDate, tTime } = translateDate(date)
  return (
    <Link to={`/plans/${id}`}>
      <li className="plan-tile callout">
        <img src={game.image_url} />
        <div>
          <p>{tDay}, {tDate}, {tTime} </p>
          <h4>{name}</h4>
          <p className='cell small-6'>{location} </p>
          <p>{plan.players.length} / {game.max_players} players</p>
        </div>
      </li>
    </Link>
  )
}

export default PlanTile;