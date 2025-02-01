import axios from 'axios';
import { ResponseUserDTO, RequestUserDTO } from '../models/User';
import { userApiUrl } from '../config/apiURl';

export const getUsers = async (): Promise<ResponseUserDTO[]> => {
  const response = await axios.get(userApiUrl, { withCredentials: true });
  return response.data;
};

export const getUserById = async (userId: string): Promise<ResponseUserDTO> => {
  const response = await axios.get(`${userApiUrl}/${userId}`, { withCredentials: true });
  return response.data;
};

export const createUser = async (newUser: RequestUserDTO): Promise<ResponseUserDTO> => {
  const response = await axios.post(userApiUrl, newUser, { withCredentials: true });
  return response.data;
};

export const updateUser = async (userId: string, newUser: RequestUserDTO): Promise<ResponseUserDTO> => {
  const response = await axios.put(`${userApiUrl}/${userId}`, newUser, { withCredentials: true });
  return response.data;
};

export const destroyUser = async (adminId: string, userId: string): Promise<void> => {
  const response = await axios.delete(`${userApiUrl}/${adminId}/${userId}`, { withCredentials: true });
  return response.data;
};
