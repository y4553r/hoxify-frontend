import React from 'react';
import * as apiCalls from './api/apiCalls';

import UserSignupPage from './pages/UserSignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  const actions = {
    postSignup: apiCalls.signup,
  };
  return (
    <div className="App">
      {/* <UserSignupPage actions={actions} /> */}
      <LoginPage />
    </div>
  );
}

export default App;
