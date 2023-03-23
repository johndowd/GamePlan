import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import FrequencyCalendar from '../plans/FrequencyCalendar';


const LandingPage = ({ user }) => {

  return (
    <>
      <div className='landing-page'>
        <div className='banner-content'>
          <div className='banner-content-text'>
            <h1>Find your new board game crew</h1>
            <p>A platform designed to help people organize and coordinate game nights with friends and family. </p>
            <p>Two different ways to find a game  <FontAwesomeIcon icon={faArrowDown} /></p>
          </div>
          <div>
            <img src='https://gameplan-jd-development.s3.us-east-2.amazonaws.com/ai-image-1.webp'></img>
          </div>
        </div>
        <div className='bottom-row'>
          <Link className='bottom-row-cell' to="/plans">
            <h5>Find upcoming plans<FontAwesomeIcon icon={faArrowDown} /></h5>
            <img className='' src="https://gameplan-jd-development.s3.us-east-2.amazonaws.com/ai-image-2.webp" />

          </Link>
          <div className='data-vis'>
            <h5>Select a date  <FontAwesomeIcon icon={faArrowDown} /></h5>
            <FrequencyCalendar />
          </div>

        </div>
        <div className='about-tag'>
          <a href="/about">about</a>
        </div>
      </div>
    </>
  )
}

export default LandingPage