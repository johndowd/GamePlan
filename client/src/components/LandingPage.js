import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {

  const rootCell =
    <div className='content-cell'>
      <img className='' src='https://gameplan-jd-development.s3.us-east-2.amazonaws.com/ezgif-2-8ef70d6e27.jpeg' />
      <div>
        <h3>Root</h3>
        <p>a fun game</p>
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
      <h5><Link to="/plans">Link to plans</Link></h5>
      <h5><Link to="/plans/new">Link to new plans page</Link></h5>
    </div>
  );
}

export default LandingPage;