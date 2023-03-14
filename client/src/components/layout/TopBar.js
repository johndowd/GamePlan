import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserTile from "../users/UserTile";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
  ]

  const authenticatedListItems = [
    <UserTile key="user-tile" user={user} small={true} />,
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
