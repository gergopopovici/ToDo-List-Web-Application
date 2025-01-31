import { ToDo } from './ToDo';

export interface Task {
  id?: number;
  description: string;
  toDo: ToDo;
}
export interface RequestTaskDTO {
  description: string;
}
export interface ResponseTaskDTO {
  id: number;
  description: string;
}
