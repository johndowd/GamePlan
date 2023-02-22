import React, { useState } from 'react';

const GameTile = ({ game, setSelectedGame }) => {

  const handleClick = (event) => {
    event.preventDefault()
    setSelectedGame(game)
  }

  return (
    <li onClick={handleClick} className='game-tile'>
      <p>{game.name}</p>
      <img src={game.image_url}></img>
      <a className='select button'>Select</a>
    </li>
  )
}

export default GameTile