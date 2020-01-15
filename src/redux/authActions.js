import * as apiCalls from '../api/apiCalls';

export const loginSuccess = loginUserData => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: loginUserData,
  };
};

export const loginHandler = credentials => {
  return dispatch => {
    return apiCalls.login(credentials)
      .then(response => {
        dispatch(loginSuccess({ ...response.data, password: credentials.password }));
        return response;
      });
  }
}