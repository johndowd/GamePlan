import React, { useState } from 'react';

import FormError from "../layout/FormError"

const AddFriendButton = ({ userProfile, setUserProfile }) => {

  const [error, setError] = useState('')

  const handleClick = async event => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/users/friend/${userProfile.id}`, {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(userProfile)
      })
      const body = await response.json()
      if (!response.ok) {
        setError(body.error)
        throw new Error(body.error)
      }
      setUserProfile({
        ...userProfile,
        friends: [...userProfile.friends, body.friend]
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <button className='button' onClick={handleClick}>Add friend</button>
      <FormError error={error} />
    </div>
  )
}

export default AddFriendButton;