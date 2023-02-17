import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import GameTile from './GameTile';

const GamesList = () => {
  const [games, setGames] = useState([])

  const fetchGames = async () => {
    try {
      const response = await fetch("/api/v1/games")
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
    return <Link key={game.id} to={`/games/${game.id}`}><GameTile game={game} /></Link>
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