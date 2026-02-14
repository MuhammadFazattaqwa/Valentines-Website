import axios from 'axios';
import { supabase } from './supabase';
import { SurpriseData, Reply, Surprise, Gallery, QuizQuestion } from '../types';

const apiUrlFromEnv = import.meta.env.VITE_API_URL?.trim();
const hasBackendApi = Boolean(apiUrlFromEnv);

const api = hasBackendApi
  ? axios.create({
      baseURL: apiUrlFromEnv,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  : null;

if (!hasBackendApi) {
  console.warn('VITE_API_URL is missing. Using direct Supabase queries from frontend.');
}

const isSurpriseData = (value: unknown): value is SurpriseData => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as {
    surprise?: unknown;
    gallery?: unknown;
    quiz?: unknown;
  };

  return Boolean(candidate.surprise) && Array.isArray(candidate.gallery) && Array.isArray(candidate.quiz);
};

const fetchSurpriseFromSupabase = async (code: string): Promise<SurpriseData> => {
  const { data: surprise, error: surpriseError } = await supabase
    .from('surprises')
    .select('*')
    .eq('code', code)
    .single<Surprise>();

  if (surpriseError || !surprise) {
    throw new Error('Surprise not found');
  }

  const [{ data: gallery, error: galleryError }, { data: quiz, error: quizError }] = await Promise.all([
    supabase
      .from('gallery')
      .select('*')
      .eq('surprise_id', surprise.id)
      .order('created_at', { ascending: true })
      .returns<Gallery[]>(),
    supabase
      .from('quiz_questions')
      .select('*')
      .eq('surprise_id', surprise.id)
      .order('created_at', { ascending: true })
      .returns<QuizQuestion[]>(),
  ]);

  if (galleryError) {
    throw new Error(`Failed to fetch gallery: ${galleryError.message}`);
  }

  if (quizError) {
    throw new Error(`Failed to fetch quiz: ${quizError.message}`);
  }

  return {
    surprise,
    gallery: gallery ?? [],
    quiz: quiz ?? [],
  };
};

export const getSurprise = async (code: string): Promise<SurpriseData> => {
  if (!api) {
    return fetchSurpriseFromSupabase(code);
  }

  const { data } = await api.get(`/api/surprise/${code}`);
  if (!isSurpriseData(data)) {
    throw new Error('Invalid API response format');
  }

  return data;
};

export const sendReply = async (reply: Reply): Promise<void> => {
  if (!api) {
    const { error } = await supabase.from('replies').insert([reply]);
    if (error) {
      throw new Error(`Failed to create reply: ${error.message}`);
    }
    return;
  }

  await api.post('/api/replies', reply);
};

export const getReplies = async (code: string): Promise<Reply[]> => {
  if (!api) {
    const { data: surprise, error: surpriseError } = await supabase
      .from('surprises')
      .select('id')
      .eq('code', code)
      .single<{ id: string }>();

    if (surpriseError || !surprise) {
      throw new Error('Surprise not found');
    }

    const { data: replies, error: repliesError } = await supabase
      .from('replies')
      .select('*')
      .eq('surprise_id', surprise.id)
      .order('created_at', { ascending: false });

    if (repliesError) {
      throw new Error(`Failed to fetch replies: ${repliesError.message}`);
    }

    return replies ?? [];
  }

  const { data } = await api.get(`/api/replies/${code}`);
  if (!Array.isArray(data)) {
    throw new Error('Invalid API response format');
  }

  return data;
};
