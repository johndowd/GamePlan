import React, { useState } from "react"

const MapSearch = (props) => {
  const [searchInput, setSearchInput] = useState("")

  const handleChange = (event) => {
    setSearchInput(event.currentTarget.value)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    props.setSearchQuery(searchInput)
  }

  return (
    <>
      <label htmlFor="search">Search maps:
        <input
          id="search"
          type="text"
          onChange={handleChange}
        />
      </label>

      <button className="button" onClick={handleSearch}>Search</button>
    </>
  )
}

export default MapSearch