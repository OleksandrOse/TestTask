import { client } from '../utils/fetchClient';

type ResponseData = {
  success: boolean;
  token: string;
};

export const getToken = () => {
  return client.get('/token') as unknown as ResponseData;
}