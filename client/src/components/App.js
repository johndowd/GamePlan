import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import PlanList from "./PlanList";
import NewPlan from "./NewPlanForm";
import LandingPage from "./LandingPage";
import PlanShowPage from "./PlanShowPage";
import SearchPage from "./layout/SearchPage";
import NewGameForm from "./NewGameForm";
import EditPlanPage from "./EditPlanPage";

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
      <Switch>
        <Route exact path="/"
          render={props => <LandingPage {...props} user={currentUser} />} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/plans" component={PlanList} />
        <Route exact path="/plans/new"
          render={props => <NewPlan {...props} user={currentUser} />} />
        <Route exact path="/plans/:id"
          render={props => <PlanShowPage {...props} user={currentUser} />} />
        <Route exact path="/games/new"
          render={props => <NewGameForm {...props} user={currentUser} />} />
        <Route path="/search/:q" component={SearchPage} />
      </Switch>
    </Router>
  )
}

export default hot(App);
