import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import UserTile from "../users/UserTile";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ]

  const authenticatedListItems = [
    <li key='usertile'>
      <UserTile user={user} small={true} />
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ]

  return (
    <div className="top-bar">
      <ul className="menu">
        <li className=""><Link to="/">GamePlan</Link></li>
      </ul>
      <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}
      </ul>
    </div>
  );
};

export default TopBar;
