import React from 'react';

const SelectedGameTile = ({ game, setGame }) => {

  const handleClick = event => {
    event.preventDefault()
    setGame({})
  }

  return (
    <li onClick={handleClick} className='game-tile'>
      <p>Currently Selected:</p>
      <p>{game.name}</p>
      <img src={game.image_url}></img>
      <a className='button' onClick={handleClick}>Remove</a>
    </li>
  )
}

export default SelectedGameTile;