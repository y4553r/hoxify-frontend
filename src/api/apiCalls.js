
import axios from 'axios';

export const signup = user => {
  axios.post('/api/1.0/users', user);
}