import axios from 'axios';
import { ToDo } from '../models/ToDo';
import { apiURL } from '../config/apiURl';

export const createToDo = async (newToDo: Omit<ToDo, 'id'>): Promise<ToDo> => {
  const response = await axios.post(`${apiURL}/todos`, newToDo);
  return response.data;
};

export const destroyToDo = async (todoid: number) => {
  const response = await axios.delete(`${apiURL}/todos/${todoid}`);
  return response.data;
};

export const getToDos = async () => {
  const response = await axios.get(`${apiURL}/todos`);
  return response.data;
};

export const getToDo = async (todoid: string): Promise<ToDo> => {
  const response = await axios.get(`${apiURL}/todos/${todoid}`);
  return response.data;
};

export const updateToDo = async (todoid: number, newToDo: Omit<ToDo, 'id'>) => {
  console.log('Updating todo with data:', newToDo);
  const response = await axios.put(`${apiURL}/todos/${todoid}`, newToDo);
  return response.data;
};

export const getToDosByPriority = async (priority: number) => {
  const response = await axios.get(`${apiURL}/todos/priority/${priority}`);
  return response.data;
};
