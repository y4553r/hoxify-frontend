
import axios from 'axios';

const URL = '/api/1.0/users';
export const signup = user => {
  return axios.post(URL, user);
}