import React from 'react';
import { Link } from 'react-router-dom'
import translateDate from '../../services/translateDate';
import { format } from 'date-fns'

const PlanTile = ({ plan }) => {
  const { id, name, game, date, location, players, owner, } = plan
  const { tDay, tDate, tTime } = translateDate(date)

  let todayStyling, todayMessage
  const tileDate = format(new Date(date), 'yyyy-MM-dd')
  const todayDate = format(new Date(), 'yyyy-MM-dd')

  if (tileDate == todayDate) {
    todayStyling = 'highlighted-text'
    todayMessage = 'TODAY, '
  }

  return (
    <Link to={`/plans/${id}`}>
      <li className="callout plan-tile ">
        <img src={game.image_url} />
        <div style={{ width: 100000 }}>
          <h4>{name}</h4>
          <div className='plan-tile-top-row'>
            <p />Hosted By <b>{owner.username}<img className='plan-tile-top-row' src={owner.image_url} /></b>
            <p id='hosted-by-name' className={todayStyling}> {todayMessage}{tDay}, {tDate}, {tTime}. </p>

          </div>
          <p className='cell small-6'>@ {location} </p>
          <p>{players.length} / {game.max_players} players</p>
        </div>
      </li>
    </Link >
  )
}

export default PlanTile;