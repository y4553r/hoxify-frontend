import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import authReducer from './authReducer';
import * as apiCalls from '../api/apiCalls';

export default (addLogger = true) => {
  let localStorageData = localStorage.getItem('hoax-auth');

  let persistedState = {
    id: 0,
    username: '',
    displayName: '',
    password: '',
    image: '',
    isLoggedIn: false,
  };
  if(localStorageData) {
    try {
      persistedState = JSON.parse(localStorageData);
      apiCalls.setAuthorizationHeader(persistedState);
    } catch (error) {}
  }

  const middlewares = [thunk];
  if(addLogger)
    middlewares.push(logger)
  const store = createStore(authReducer, persistedState, applyMiddleware(...middlewares));

  store.subscribe(() => {
    localStorage.setItem('hoax-auth', JSON.stringify(store.getState()));
    apiCalls.setAuthorizationHeader(store.getState());
  }); 

  return store;
}