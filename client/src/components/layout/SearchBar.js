import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SearchBar = (props) => {

  const [search, setSearch] = useState("")

  return (
    <div className='search-bar'>
      <input
        type="search"
        placeholder="Search"
        id="search"
        onChange={e => setSearch(e.target.value)}
      />
      <Link className='button' to={`/search/${search}`}>Search</Link>
    </div>
  )
}

export default SearchBar;