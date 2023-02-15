import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import GameTile from './GameTile';
import FormError from './layout/FormError';

const GameSearchField = ({ error, setSelectedGame }) => {
  const [search, setSearch] = useState("")
  const [games, setGames] = useState([])
  const [errors, setErrors] = useState([])
  const [addGame, setAddGame] = useState(false)

  if (error?.["Game Id"]) {
    setErrors([...errors,
    error["Game Id"]])
  }

  const getSearchGame = async () => {
    try {
      const response = await fetch(`/api/v1/games/search/${search}`)
      if (!response.ok) {
        if (response.status === 404) {
          setErrors(["no game searched"])
        }
      }
      const body = await response.json()
      if (body.games.length == 0) {
        setErrors(["No games found"])
        setAddGame(true)
      } else {
        setErrors([])
        setGames(body.games)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const gameTiles = games.map(game => {
    return <GameTile key={game.id} game={game} setSelectedGame={setSelectedGame} />
  })

  let addButton
  if (addGame) {
    addButton = <Link className='button success' to="/games/new">Add new Game</Link>
  }

  return (
    <label>Game:
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <FormError error={errors} />
      <ul className='game-tile-container'>
        {gameTiles}
      </ul>
      <a className='button' onClick={getSearchGame}>Search for game</a>
      {addButton}
    </label>
  )
}

export default GameSearchField;