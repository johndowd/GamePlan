import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  const [cellData, setCellData] = useState({ tags: []})

  const getData = async () => {
    try {
      const response = await fetch("https://api.boardgameatlas.com/api/search?name=root&client_id=VVQr9UTrTD&limit=1")
      //placeholder until i seed database from this api
      const body = await response.json()
      const game = body.games[0]
      setCellData(game)
    } catch (error) {
      console.error(error)
    }
  }

  //TODO: seed games database from external db
  //TODO: Create games model and database

  useEffect(() => {
    getData()
  }, [])

  const rootCell =
    <div className='content-cell'>
      <img className='' src={cellData.image_url} />
      <div>
        <h3>{cellData.name}</h3>
        <p>{cellData.tags[5]}</p>
        <a>Click here to play!</a>
      </div>
    </div>


  return (
    <div className='landing-page'>
      <h3 className='banner-header'>Trending Games Today:</h3>
      <div className='banner-content row'>
        {rootCell}
        {rootCell}
        {rootCell}
      </div>
      <div className=''>
        <h5 className='columns'><Link to="/plans">View current game nights being planned!</Link></h5>
        <h5 className='columns'><Link to="/plans/new">Add a new game night!</Link></h5>
      </div>
    </div>
  );
}

export default LandingPage;