import React from 'react';
import { Link } from 'react-router-dom'

const SimpleGameTile = ({ game }) => {

  return (
    <li className='game-tile'>
      <Link to={`/games/${game.id}/plans`}>
        <p>{game.name}</p>
        <img src={game.image_url}></img>
      </Link>
    </li>
  )
}

export default SimpleGameTile