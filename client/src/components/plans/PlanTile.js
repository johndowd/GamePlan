import React from 'react';
import { Link } from 'react-router-dom'
import translateDate from '../../services/translateDate';

const PlanTile = ({ plan }) => {
  const { id, name, game, date, location, players, owner, } = plan
  const { tDay, tDate, tTime } = translateDate(date)
  return (
    <Link to={`/plans/${id}`}>
      <li className="callout plan-tile ">
        <img src={game.image_url} />
        <div>
          <div className='plan-tile-top-row'>
            <p id='hosted-by-name' />{tDay}, {tDate}, {tTime}.
            <p />Hosted By {owner.username}
            <img className='plan-tile-top-row' src={owner.image_url} />
          </div>
          <h4>{name}</h4>
          <p className='cell small-6'>@ {location} </p>
          <p>{plan.players.length} / {game.max_players} players</p>
        </div>
      </li>
    </Link >
  )
}

export default PlanTile;