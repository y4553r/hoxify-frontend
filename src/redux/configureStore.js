import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import authReducer from './authReducer';

export default (addLogger = true) => {
  const middlewares = [thunk];
  if(addLogger)
    middlewares.push(logger)
  return createStore(authReducer, applyMiddleware(...middlewares));
}