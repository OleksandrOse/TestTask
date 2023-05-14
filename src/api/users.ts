import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<any>('/users?page=1&count=6');
}


export const getMoreUsers = (count: number) => {
  return client.get<any>(`/users?page=1&count=${count}`);
}