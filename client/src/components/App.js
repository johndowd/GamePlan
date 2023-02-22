import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./users/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import PlanList from "./plans/PlanList";
import NewPlan from "./plans/NewPlanForm";
import LandingPage from "./layout/LandingPage";
import PlanShowPage from "./plans/PlanShowPage";
import SearchPage from "./layout/SearchPage";
import NewGameForm from "./games/NewGameForm";
import GamesList from "./games/GamesList";
import UserProfile from "./users/UserProfile";
import UserList from "./users/UserList";
import SelectedPlanList from "./games/SelectedPlanList";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <div className="app">
        <Switch>
          <Route exact path="/"
            render={props => <LandingPage {...props} user={currentUser} />} />
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
          <Route exact path="/plans"
            render={props => <PlanList {...props} user={currentUser} />} />
          <Route exact path="/plans/new"
            render={props => <NewPlan {...props} user={currentUser} />} />
          <Route exact path="/plans/new/:id"
            render={props => <NewPlan {...props} user={currentUser} />} />
          <Route exact path="/plans/:id"
            render={props => <PlanShowPage {...props} user={currentUser} />} />
          <Route exact path="/games" component={GamesList} />
          <Route exact path="/games/new"
            render={props => <NewGameForm {...props} user={currentUser} />} />
          <Route exact path="/games/:id/plans"
            render={props => <SelectedPlanList {...props} user={currentUser} />} />
          <Route exact path="/search/:q" component={SearchPage} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/:username"
            render={props => <UserProfile {...props} user={currentUser} />} />
        </Switch>
      </div>
    </Router>
  )
}

export default hot(App);
