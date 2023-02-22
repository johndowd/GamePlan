import React, { useState } from 'react';

import UserTile from './UserTile';

const UserList = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/v1/users")
      const body = await response.json()
      setUsers(body.users)
    } catch (error) {
      console.error(error)
    }
  }

  useState(() => {
    fetchUsers()
  }, [])

  const userTiles = users.map(user => {
    return <UserTile user={user} key={user.id} />
  })

  return (
    <ul>
      {userTiles}
    </ul>
  );
}

export default UserList;