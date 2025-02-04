export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  admin: boolean;
}
export interface RequestUserDTO {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  admin: boolean;
}
export interface ResponseUserDTO {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  admin: boolean;
}
