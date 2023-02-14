import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SearchBar = (props) => {

  const [search, setSearch] = useState("")

  return ( 
    <>
      <li/><input 
        type="search" 
        placeholder="Search" 
        id="search" 
        onChange={e => setSearch(e.target.value)}
      />
      <li/><Link className='button' to={`/search/${search}`}>Search</Link>
    </>
  )
}

export default SearchBar;