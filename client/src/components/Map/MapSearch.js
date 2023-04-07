import React, { useState } from "react"

const MapSearch = (props) => {

  const handleSearch = (event) => {
    event.preventDefault()
    props.setSearchQuery(props?.formData?.location)
  }

  return (
    <>
      <label htmlFor="location">
        <input
          id="location"
          type="text"
          onChange={props.handleChange}
          value={props?.formData?.location}
        />
      </label>
      <button className="button" onClick={handleSearch}>Search</button>
    </>
  )
}

export default MapSearch