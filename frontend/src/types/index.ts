export interface Surprise {
  id: string;
  code: string;
  recipient_name: string;
  message: string;
  created_at: string;
}

export interface Gallery {
  id: string;
  surprise_id: string;
  image_url: string;
  caption: string;
}

export interface QuizQuestion {
  id: string;
  surprise_id: string;
  question: string;
  options: string[];
  answer_index: number;
}

export interface Reply {
  id?: string;
  surprise_id: string;
  sender_name: string;
  message: string;
  created_at?: string;
}

export interface SurpriseData {
  surprise: Surprise;
  gallery: Gallery[];
  quiz: QuizQuestion[];
}
