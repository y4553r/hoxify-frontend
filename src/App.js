import React from 'react';
import * as apiCalls from './api/apiCalls';

import UserSignupPage from './pages/UserSignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  const actions = {
    postSignup: apiCalls.signup,
    postLogin: apiCalls.login,
  };
  return (
    <div className="App">
      {/* <UserSignupPage actions={actions} /> */}
      <LoginPage actions={actions} />
    </div>
  );
}

export default App;
