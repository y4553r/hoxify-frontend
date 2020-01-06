import React from 'react';
import * as apiCalls from './api/apiCalls';

import UserSignupPage from './pages/UserSignupPage';

function App() {
  const actions = {
    postSignup: apiCalls.signup,
  };
  return (
    <div className="App">
      <UserSignupPage actions={actions} />
    </div>
  );
}

export default App;
