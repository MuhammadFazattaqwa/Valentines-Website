import axios from 'axios';
import { SurpriseData, Reply } from '../types';

const apiUrlFromEnv = import.meta.env.VITE_API_URL?.trim();
const API_URL =
  apiUrlFromEnv || (import.meta.env.DEV ? 'http://localhost:5000' : window.location.origin);

if (!apiUrlFromEnv && !import.meta.env.DEV) {
  console.warn('VITE_API_URL is missing in production. Falling back to current origin.');
}

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
