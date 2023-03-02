import React from 'react';

import months from '../../services/months'
import UserTile from '../users/UserTile';
import translateDate from '../../services/translateDate';
import CommentForm from './CommentForm';

const CommentList = ({ setPlan, plan, user }) => {


  const commentTiles = plan.comments.map(comment => {
    const { tDay, tDate, tTime } = translateDate(comment.createdAt)
    const [month, day, year] = tDate.split("/")
    const dateString = `${months[month - 1]} ${day}, ${year}`
    return (
      <li key={comment.id} className='callout comment-tile'>
        <div className='comment-head'>
          <UserTile user={comment.user} small={true} />
          <h5>{dateString} @ {tTime}</h5>
        </div>
        <div className='comment'>
          {comment.text}
        </div>
      </li>
    )
  })

  let commentsText = ""
  if (plan.comments.length === 0) {
    commentsText = "No comments yet!"
    if (user) {
      commentsText += " Leave one below!"
    } else {
      commentsText += " Sign in to leave a comment!"
    }
  }

  return (
    <div className='comment-list'>
      <h2>Comments</h2>
      <ul>
        {commentTiles}
        {commentsText}
      </ul>
      {user ? <CommentForm
        setPlan={setPlan}
        plan={plan}
        user={user}
      /> : ""}
    </div>
  )
}

export default CommentList;