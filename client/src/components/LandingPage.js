import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import Footer from './layout/Footer';

const LandingPage = ({ user }) => {
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

  let authLinks
  if (user) {
    authLinks =
      <div>
        <h5><Link to="/plans/new">Add a new game plan!</Link></h5>
        <h5><Link to="/games/new">Add a new game</Link></h5>
      </div>
  }

  return (
    <>
      <div className='landing-page'>
        <div className='circle'></div>
        <div className='banner-content'>
          <div className='banner-content-text'>
            <h2>Find your new board game crew</h2>
            <p>A platform designed to help people organize and coordinate game nights with friends and family.</p>
          </div>
          <div>
            <img src='https://gameplan-jd-development.s3.us-east-2.amazonaws.com/ai-image-1.webp'></img>
          </div>
        </div>
        <div className='bottom-row'>
          <Link className='bottom-row-cell' to="/plans">
            <img className='' src="https://gameplan-jd-development.s3.us-east-2.amazonaws.com/ai-image-2.webp" />

            <h5>Make new friends <FontAwesomeIcon icon={faArrowRight} /></h5>
          </Link>
          <Link className='bottom-row-cell' to="/games">

            <img className='' src="https://gameplan-jd-development.s3.us-east-2.amazonaws.com/ai-image-3.webp" />
            <h5>Discover new games <FontAwesomeIcon icon={faArrowRight} /> </h5>
          </Link>
          <Link className='bottom-row-cell' to="/places">
            <img className='' src="https://gameplan-jd-development.s3.us-east-2.amazonaws.com/ai-image-4.webp" />
            <h5>Connect at a local business <FontAwesomeIcon icon={faArrowRight} /></h5>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LandingPage