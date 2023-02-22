import React, { useState } from 'react';
import FormError from '../layout/FormError';
import UserTile from '../users/UserTile';

const CommentForm = ({ setPlan, plan, user }) => {

  const [comment, setComment] = useState({ text: "" })
  const [error, setError] = useState({})

  const handleChange = event => {
    setComment({ text: event.currentTarget.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (comment.trim() == "") {
      return setError({ text: "Must not be empty" })
    }
    try {
      const response = await fetch(`/api/v1/comments/${plan.id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const body = await response.json()
      const newComments = plan.comments.concat(body.comment)
      setPlan({
        ...plan,
        comments: newComments
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h4>Add comment</h4>
      {user?.id ? <UserTile user={user} small={true} /> : ""}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='text'
          value={comment.text}
          onChange={handleChange}
        ></input>
        <FormError error={error.text} />
        <button className='button'>Submit</button>
      </form>
    </>
  )
}

export default CommentForm;