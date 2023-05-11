import React, { useEffect, useState } from 'react';
import EditUserProfile from './EditUserProfile';
import PlanTile from '../plans/PlanTile';
import UserTile from './UserTile';
import AddFriendButton from './AddFriendButton';
import UserClient from '../../services/apiClient/UserClient';
import SignOutButton from '../authentication/SignOutButton'
import BotBehaviorClient from '../../services/apiClient/BotBehaviorClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserProfile = ({ match, user }) => {
  const [userProfile, setUserProfile] = useState({
    username: "",
    plansCreated: [],
    image_url: "",
    friends: []
  })
  const [edit, setEdit] = useState(false)

  const fetchUserProfile = async () => {
    const { username } = match.params
    const newUserProfile = await UserClient.fetchProfileByUsername(username)
    setUserProfile(newUserProfile)
  }

  useEffect(() => {
    fetchUserProfile()
  }, [match])

  const plansCreatedTiles = userProfile.plansCreated.map(plan => {
    return <PlanTile key={plan.id} plan={plan} />
  })

  let authButtons
  if (user?.id == userProfile.id) {
    authButtons = (
      <>
        <a className='button warning' onClick={e => setEdit(true)}>Edit Profile</a>
        <SignOutButton />
      </>
    )
  }

  if (edit) {
    return <EditUserProfile user={user} userProfile={userProfile} setUserProfile={setUserProfile} />
  }

  let addFriend
  if (user && user.id !== userProfile.id) {
    addFriend = <AddFriendButton userProfile={userProfile} setUserProfile={setUserProfile} />
  }

  const friendTiles = userProfile.friends.map(friend => {
    return <UserTile user={friend} small={true} />
  })

  const handleCreatePlan = async (e) => {
    e.preventDefault()
    document.getElementById('generate-plan-button').innerHTML = 'generating...'
    document.getElementById('generate-plan-button').disabled = true
    BotBehaviorClient.createPlan(userProfile.username).then(d => {
      window.location.href = `/plans/${d.plan.id}`
    })
  }

  let aiButtons = ''
  if (userProfile.isAi) {
    aiButtons = <>
      <h2> Ai Controls</h2>
      <button
        id='generate-plan-button'
        className='button'
        onClick={handleCreatePlan}
      >Create new plan</button>
      <br />
    </>
  }

  return (
    <div className='user-profile content-background'>
      <img id='user-profile-image' src={userProfile.image_url} />
      <h1>{userProfile.username} </h1>
      {authButtons}
      <h2>Friends {addFriend}</h2>
      {friendTiles}
      <br />
      {aiButtons}
      <h2>Created Games </h2>
      <ul>
        {plansCreatedTiles}
      </ul>
    </div>
  );
}

export default UserProfile;