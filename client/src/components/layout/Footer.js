import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';

const Footer = () => {
  return (
    <div className='footer'>
      <p>Created By Jack Dowd</p>
      <Link>Github</Link>
      <SearchBar />
    </div>
  )
}

export default Footer;