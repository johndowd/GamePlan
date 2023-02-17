import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import EditUserProfile from './EditUserProfile';
import PlanTile from './PlanTile';

const UserProfile = ({ match, user }) => {
  const [userProfile, setUserProfile] = useState({
    username: "",
    plansCreated: []
  })
  const [edit, setEdit] = useState(false)

  const fetchUserProfile = async () => {
    const { username } = match.params
    try {
      const response = await fetch(`/api/v1/users/${username}`)
      const body = await response.json()
      setUserProfile(body.userProfile)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const plansCreatedTiles = userProfile.plansCreated.map(plan => {
    return <PlanTile key={plan.id} plan={plan} />
  })

  let editButton
  if (user?.id == userProfile.id) {
    editButton = <a className='button warning' onClick={e => setEdit(true)}>Edit Profile</a>
  }

  if (edit) {
    return <EditUserProfile user={user} userProfile={userProfile} setUserProfile={setUserProfile} />
  }

  return (
    <div className='user-profile'>
      <h3>{userProfile.username}'s Profile</h3>
      {editButton}
      <h4>Games Created: </h4>
      <ul>
        {plansCreatedTiles}
      </ul>
    </div>
  );
}

export default UserProfile;