import React, { useEffect, useState } from 'react';
import GameTile from './GameTile';
import SimpleGameTile from './SimpleGameTile';

const GamesList = (props) => {
  const [games, setGames] = useState([])

  const fetchGames = async () => {
    try {
      const response = await fetch(`/api/v1/games`)
      const body = await response.json()
      setGames(body.games)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])

  const gameTiles = games.map(game => {
    return <SimpleGameTile key={game.id} game={game} />
  })

  return (
    <div className='game-list-page'>
      <ul className='grid-container game-list'>
        {gameTiles}
      </ul>
    </div>

  );
}

export default GamesList;