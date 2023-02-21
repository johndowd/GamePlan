import React, { useState } from 'react';
import UserTile from './UserTile';

const CommentForm = ({ setPlan, plan, user }) => {

  const [comment, setComment] = useState({ text: "" })

  const handleChange = event => {
    setComment({ text: event.currentTarget.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
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
        <button className='button'>Submit</button>
      </form>
    </>
  )
}

export default CommentForm;