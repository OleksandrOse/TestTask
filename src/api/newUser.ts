import { client } from '../utils/fetchClient';

export const postNewUser = (data: any, token: string) => {
  return client.post<any>('/users', data, token);
}
