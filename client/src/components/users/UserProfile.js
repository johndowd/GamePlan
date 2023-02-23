import React, { useEffect, useState } from 'react';
import EditUserProfile from './EditUserProfile';
import PlanTile from '../plans/PlanTile';

const UserProfile = ({ match, user }) => {
  const [userProfile, setUserProfile] = useState({
    username: "",
    plansCreated: [],
    image_url: ""
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
      <img id='user-profile-image' src={userProfile.image_url} />
      <h1>{userProfile.username}</h1>
      {editButton}
      <h2>Created Games </h2>
      <ul>
        {plansCreatedTiles}
      </ul>
    </div>
  );
}

export default UserProfile;