import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const LandingPage = ({ user }) => {

  return (
    <>
      <div className='landing-page'>
        <div className='circle'></div>
        <div className='banner-content'>
          <div className='banner-content-text'>
            <h1>Find your new board game crew</h1>
            <p>A platform designed to help people organize and coordinate game nights with friends and family.</p>
          </div>
          <div>
            <img src='https://gameplan-jd-development.s3.us-east-2.amazonaws.com/ai-image-1.webp'></img>
          </div>
        </div>
        <div className='bottom-row'>
          <Link className='bottom-row-cell' to="/plans">
            <img className='' src="https://gameplan-jd-development.s3.us-east-2.amazonaws.com/ai-image-2.webp" />

            <h5>Find a game night <FontAwesomeIcon icon={faArrowRight} /></h5>
          </Link>
          <Link className='bottom-row-cell' to="/games">

            <img className='' src="https://gameplan-jd-development.s3.us-east-2.amazonaws.com/ai-image-3.webp" />
            <h5>Discover new games <FontAwesomeIcon icon={faArrowRight} /> </h5>
          </Link>
          <Link className='bottom-row-cell' to="/users">
            <img className='' src="https://gameplan-jd-development.s3.us-east-2.amazonaws.com/ai-image-4.webp" />
            <h5>Make new friends <FontAwesomeIcon icon={faArrowRight} /></h5>
          </Link>
        </div>
      </div>
    </>
  )
}

export default LandingPage