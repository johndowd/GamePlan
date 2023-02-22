import React from "react"

const ErrorList = props => {
  const errantFields = Object.keys(props.errors)
  console.log(errantFields);
  if (errantFields.length > 0) {
    let index = 0
    const listItems = errantFields.map(field => {
      console.log(field, props.errors);
      index++
      return (
        <li key={index}>
          {props.errors[field]}
        </li>
      )
    })

    return (
      <div className="callout alert">
        <ul>{listItems}</ul>
      </div>
    )
  } else {
    return ""
  }
}

export default ErrorList
