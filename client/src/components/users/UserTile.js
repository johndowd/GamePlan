import React from 'react';
import { Link } from 'react-router-dom'

const UserTile = (props) => {
  const { user } = props
  return (
    <Link to={`/users/${user.username}`} key={user.id}>
      <div className={`${props?.small ? "user-tile-small" : "user-tile"}`}>
        <img src={user.image_url} /> {user.username}
      </div>
    </Link>
  )
}

export default UserTile;