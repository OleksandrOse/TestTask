import { client } from '../utils/fetchClient';

export const getPositions = () => {
  return client.get<any>('/positions')
    
};
