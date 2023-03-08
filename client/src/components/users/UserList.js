import React, { useState } from 'react';
import UserClient from '../../services/apiClient/UserClient';

import UserTile from './UserTile';

const UserList = () => {
  const [users, setUsers] = useState([])

  useState(async () => {
    const newUsers = await UserClient.fetchUsers()
    setUsers(newUsers)
  }, [])

  const userTiles = users.map(user => {
    return <UserTile user={user} key={user.id} />
  })

  return (
    <div className='users-list content-background'>
      <h1>Active Users </h1>
      <ul className='user-list'>
        {userTiles}
      </ul>
    </div>
  )
}

export default UserList;