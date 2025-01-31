import axios from 'axios';
import { RequestTaskDTO, ResponseTaskDTO } from '../models/Task';
import { apiURL } from '../config/apiURl';

export const getTaskByToDoId = async (todoId: number): Promise<ResponseTaskDTO[]> => {
  const response = await axios.get(`${apiURL}/todos/${todoId}/tasks`);
  return response.data;
};
export const addTaskToToDo = async (todoId: number, newTask: RequestTaskDTO): Promise<ResponseTaskDTO> => {
  const response = await axios.post(`${apiURL}/todos/${todoId}/tasks`, newTask);
  return response.data;
};
export const deleteTaskFromToDo = async (todoId: number, taskId: number): Promise<void> => {
  await axios.delete(`${apiURL}/todos/${todoId}/tasks/${taskId}`);
};
