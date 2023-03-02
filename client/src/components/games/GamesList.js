import React, { useEffect, useState } from 'react';
import SimpleGameTile from './SimpleGameTile';

const GamesList = (props) => {
  const [games, setGames] = useState([])

  const fetchGames = async () => {
    try {
      const response = await fetch(`/api/v1/games`)
      const body = await response.json()
      const sortedGames = body.games.sort((game1, game2) => {
        const date1 = new Date(game1.date)
        const date2 = new Date(game2.date)
        return (date1 > date2 ? 1 : -1)
      })
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
    <div className='game-list-page content-background'>
      <h2>Recent Games</h2>
      <ul className='game-list'>
        {gameTiles}
      </ul>
    </div>

  );
}

export default GamesList;