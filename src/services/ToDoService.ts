import axios from 'axios';
import { RequestToDoDTO, ResponseToDoDTO } from '../models/ToDo';
import { apiURL } from '../config/apiURl';

export const createToDo = async (newToDo: RequestToDoDTO): Promise<ResponseToDoDTO> => {
  const response = await axios.post(`${apiURL}/todos`, newToDo);
  return response.data;
};

export const destroyToDo = async (todoid: number, userId: number): Promise<void> => {
  await axios.delete(`${apiURL}/todos/${todoid}`, {
    params: { userId },
  });
};

export const getToDos = async (): Promise<ResponseToDoDTO[]> => {
  const response = await axios.get(`${apiURL}/todos`);
  return response.data;
};

export const getToDo = async (todoid: string): Promise<ResponseToDoDTO> => {
  const response = await axios.get(`${apiURL}/todos/${todoid}`);
  return response.data;
};

export const updateToDo = async (todoid: number, newToDo: RequestToDoDTO): Promise<ResponseToDoDTO> => {
  console.log('Updating todo with data:', newToDo);
  const response = await axios.put(`${apiURL}/todos/${todoid}`, newToDo);
  return response.data;
};

export const getToDosByPriority = async (priority: number): Promise<ResponseToDoDTO[]> => {
  const response = await axios.get(`${apiURL}/todos/priority/${priority}`);
  return response.data;
};

export const getToDosByUser = async (userid: number): Promise<ResponseToDoDTO[]> => {
  const response = await axios.get(`${apiURL}/todos/user/${userid}`);
  return response.data;
};
