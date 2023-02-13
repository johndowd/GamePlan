import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div>
      <h2>Game Plan</h2>
      <h5><Link to="/plans">Link to plans</Link></h5>
      <h5><Link to="/plans/new">Link to new plans page</Link></h5>
    </div>
  );
}

export default LandingPage;