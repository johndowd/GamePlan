import React, { useEffect, useState } from 'react';
import UserTile from './UserTile';
import translateDate from '../services/translateDate';
import CommentForm from './CommentForm';

const CommentList = ({ setPlan, plan, user }) => {


  const commentTiles = plan.comments.map(comment => {
    const { tDay, tDate, tTime } = translateDate(comment.createdAt)
    return (
      <li key={comment.id} className='callout '>
        On {tDate} @ {tTime}, <UserTile user={comment.user} small={true} />
        <br />
        {comment.text}
      </li>
    )
  })

  return (
    <>
      <h2>Comments</h2>
      <ul>
        {commentTiles}
      </ul>
      {user ? <CommentForm
        setPlan={setPlan}
        plan={plan}
        user={user}
      /> : ""}
    </>
  )
}

export default CommentList;