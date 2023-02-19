import React from 'react';
import { Link } from 'react-router-dom'

const UserTile = ({ user }) => {

  return (
    <Link to={`/users/${user.username}`}>
      <li className='user-tile callout'>
        {user.image_url ? <img src={user.image_url} /> : ""}
        {user.username}
      </li>
    </Link>
  );
}

export default UserTile;