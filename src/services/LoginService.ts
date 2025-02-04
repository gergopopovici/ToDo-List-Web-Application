import axios from 'axios';
import { loginApiUrl } from '../config/apiURl';
import { Login } from '../models/Login';

export const loginIn = async (login: Login) => {
  const response = await axios.post(loginApiUrl, login, { withCredentials: true });
  return response.data;
};
