import axios from 'axios';
import { SurpriseData, Reply } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSurprise = async (code: string): Promise<SurpriseData> => {
  const { data } = await api.get(`/api/surprise/${code}`);
  return data;
};

export const sendReply = async (reply: Reply): Promise<void> => {
  await api.post('/api/replies', reply);
};

export const getReplies = async (code: string): Promise<Reply[]> => {
  const { data } = await api.get(`/api/replies/${code}`);
  return data;
};
