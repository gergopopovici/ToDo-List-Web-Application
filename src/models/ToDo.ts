type Task = {
  id: number;
  description: string;
};

export interface ToDo {
  id?: number;
  title: string;
  description: string;
  date: Date;
  priority: number;
  userId: number;
  tasks?: Task[];
}
export interface RequestToDoDTO {
  title: string;
  description: string;
  date: Date;
  priority: number;
  userId: number;
  tasks?: Task[];
}
export interface ResponseToDoDTO {
  id: number;
  title: string;
  description: string;
  date: Date;
  priority: number;
  userId: number;
  tasks?: Task[];
}
export interface ToDoFilters {
  priority?: number | null;
  dueDateFrom?: Date | null;
  dueDateTo?: Date | null;
}
