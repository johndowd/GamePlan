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

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
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
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/plans" component={PlanList} />
        <Route exact path="/plans/new" component={NewPlan} />
        <Route exact path="/plans/:id" component={PlanShowPage} />
        <Route path="/search/:q" component={SearchPage} /> 
      </Switch>
    </Router>
  );
};

export default hot(App);
