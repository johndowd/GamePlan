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
      <li key={comment.id} className='callout '>
        On {dateString} @ {tTime}, <UserTile user={comment.user} small={true} />
        <br />
        {comment.text}
      </li>
    )
  })

  return (
    <div className='comment-list'>
      <h2>Comments</h2>
      <ul>
        {commentTiles}
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