export interface ToDo {
  id?: number;
  title: string;
  description: string;
  date: Date;
  priority: number;
  userId: number;
}
export interface RequestToDoDTO {
  title: string;
  description: string;
  date: Date;
  priority: number;
  userId: number;
}
export interface ResponseToDoDTO {
  id: number;
  title: string;
  description: string;
  date: Date;
  priority: number;
  userId: number;
}
