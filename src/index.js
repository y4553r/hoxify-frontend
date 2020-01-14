import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import App from './containers/App';
import authReducer from './redux/authReducer';

const loggedInState = {
  id: 1,
  username: 'user1',
  displayName: 'display1',
  image: 'image1',
  password: 'P4ssword',
  isLoggedIn: true,
};

const store = createStore(authReducer, loggedInState, applyMiddleware(logger));

const app = (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
