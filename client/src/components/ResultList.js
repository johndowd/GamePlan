import React, { useState } from "react"

const ResultList = (props) => {
  const [selected, setSelected] = useState({})

  const results = props.searchResults.map((result) => {

    const handleClick = event => {
      event.preventDefault()
      setSelected(result)
      props.setFormData({
        ...FormData,
        location: result.name,
        address: result.formatted_address
      })
      props.setShowMap(false)
    }

    return (
      <div className={`callout ${selected == result ? 'warning' : ''}`} onClick={handleClick} key={result.formatted_address}>
        <h3>{result.name}</h3>
        <p>{result.formatted_address}</p>
      </div>
    )
  })

  return (
    <>
      {results}
    </>
  )
}

export default ResultList