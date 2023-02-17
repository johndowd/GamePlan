import React from 'react';
import { Link } from 'react-router-dom'

const UserTile = ({ user }) => {

  return (
    <Link to={`/users/${user.username}`}>
      <li className='plan-tile callout'>
        {user.username}
      </li>
    </Link>
  );
}

export default UserTile;