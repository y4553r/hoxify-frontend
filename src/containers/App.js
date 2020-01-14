import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as apiCalls from '../api/apiCalls';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserSignupPage from '../pages/UserSignupPage';
import UserPage from '../pages/UserPage';
import TopBar from '../components/TopBar';

function App() {
  const actions = {
    postSignup: apiCalls.signup,
    postLogin: apiCalls.login,
  };
  return (
    <div>
      <TopBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" render={routerProps => <LoginPage {...routerProps} actions={actions} />} />
          <Route path="/signup" render={routerProps => <UserSignupPage {...routerProps} actions={actions} />} />
          <Route path="/:username" component={UserPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
