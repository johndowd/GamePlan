import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  const [games, setGames] = useState([])

  const getTrendingGames = async () => {
    try {
      const response = await fetch("/api/v1/games/trending")
      const body = await response.json()
      setGames(body.games)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTrendingGames()
  }, [])

  const gameBoxes = games.map(game => {
    return (
    <div key={game.id} className='content-cell'>
    <img className='' src={game.image_url} />
    <div>
      <h3>{game.name}</h3>
      <a>Click here to play!</a>
    </div>
  </div>
    )
  })



  return (
    <div className='landing-page'>
      <h3 className='banner-header'>Trending Games Today:</h3>
      <div className='banner-content row'>
        {gameBoxes}
      </div>
      <div className=''>
        <h5 className='columns'><Link to="/plans">View current game nights being planned!</Link></h5>
        <h5 className='columns'><Link to="/plans/new">Add a new game night!</Link></h5>
      </div>
    </div>
  )
}

export default LandingPage