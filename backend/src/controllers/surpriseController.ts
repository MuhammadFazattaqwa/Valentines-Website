import { Request, Response } from 'express';
import { supabase } from '../supabase.js';

export const getSurprise = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    // Get surprise data
    const { data: surprise, error: surpriseError } = await supabase
      .from('surprises')
      .select('*')
      .eq('code', code)
      .single();

    if (surpriseError || !surprise) {
      return res.status(404).json({ error: 'Surprise not found' });
    }

    // Get gallery
    const { data: gallery, error: galleryError } = await supabase
      .from('gallery')
      .select('*')
      .eq('surprise_id', surprise.id);

    if (galleryError) {
      return res.status(500).json({ error: 'Failed to fetch gallery' });
    }

    // Get quiz questions
    const { data: quiz, error: quizError } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('surprise_id', surprise.id);

    if (quizError) {
      return res.status(500).json({ error: 'Failed to fetch quiz' });
    }

    res.json({
      surprise,
      gallery: gallery || [],
      quiz: quiz || [],
    });
  } catch (error) {
    console.error('Error fetching surprise:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createReply = async (req: Request, res: Response) => {
  try {
    const { surprise_id, sender_name, message } = req.body;

    if (!surprise_id || !sender_name || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('replies')
      .insert([{ surprise_id, sender_name, message }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Failed to create reply' });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getReplies = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    // Get surprise ID from code
    const { data: surprise, error: surpriseError } = await supabase
      .from('surprises')
      .select('id')
      .eq('code', code)
      .single();

    if (surpriseError || !surprise) {
      return res.status(404).json({ error: 'Surprise not found' });
    }

    // Get replies
    const { data: replies, error: repliesError } = await supabase
      .from('replies')
      .select('*')
      .eq('surprise_id', surprise.id)
      .order('created_at', { ascending: false });

    if (repliesError) {
      return res.status(500).json({ error: 'Failed to fetch replies' });
    }

    res.json(replies || []);
  } catch (error) {
    console.error('Error fetching replies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
