import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';

const Footer = () => {
  return (
    <div className='footer'>
      <p>Created By Jack Dowd</p>
      <a href="https://github.com/johndowd">Github</a>
      <SearchBar />
    </div>
  )
}

export default Footer;