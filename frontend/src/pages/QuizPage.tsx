import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion } from '../types';

interface QuizPageProps {
  onNext: () => void;
  quiz: QuizQuestion[];
}

const QuizPage = ({ onNext, quiz }: QuizPageProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const scorePercentage = useMemo(
    () => (quiz.length ? Math.round((score / quiz.length) * 100) : 0),
    [quiz.length, score],
  );

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(answerIndex);

    if (answerIndex === quiz[currentQuestion].answer_index) {
      setScore((previous) => previous + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < quiz.length) {
        setCurrentQuestion((previous) => previous + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 850);
  };

  const getOptionClass = (index: number, answerIndex: number) => {
    if (selectedAnswer === null) {
      return 'border-slate-200 bg-white/85 hover:-translate-y-0.5 hover:border-valentine-rose/50 hover:bg-white';
    }

    if (index === answerIndex) {
      return 'border-emerald-300 bg-emerald-100 text-emerald-900';
    }

    if (selectedAnswer === index) {
      return 'border-rose-300 bg-rose-100 text-rose-900';
    }

    return 'border-slate-200 bg-slate-100 text-slate-500';
  };

  if (!quiz.length) {
    return (
      <div className="page-wrap flex items-center justify-center">
        <div className="page-content max-w-xl">
          <div className="glass-card p-10 text-center">
            <h2 className="title-gradient text-4xl font-bold">Quiz belum tersedia</h2>
            <button type="button" className="outline-btn mt-6" onClick={onNext}>
              Lanjut
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const summaryIcon =
      score === quiz.length ? '🏆' : score >= Math.ceil(quiz.length / 2) ? '😊' : '💪';

    return (
      <div className="page-wrap flex items-center justify-center">
        <motion.div
          className="page-content max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="glass-card p-8 text-center sm:p-10">
            <span className="section-chip mb-4">Quiz Finished</span>
            <h2 className="title-gradient mb-3 text-4xl font-bold md:text-5xl">Hasil Quiz 🎯</h2>

            <p className="mb-3 text-5xl">{summaryIcon}</p>
            <p className="text-lg font-medium text-slate-700">
              Skor kamu: <span className="font-bold text-valentine-red">{score}</span> / {quiz.length}
            </p>

            <div className="mx-auto mt-6 h-3 max-w-md overflow-hidden rounded-full bg-valentine-pink/35">
              <motion.div
                className="h-full bg-gradient-to-r from-valentine-rose to-valentine-red"
                initial={{ width: 0 }}
                animate={{ width: `${scorePercentage}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </div>
            <p className="mt-2 text-sm text-slate-500">{scorePercentage}% jawaban benar</p>

            <button type="button" className="primary-btn mt-8" onClick={onNext}>
              Lanjut 💕
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = quiz[currentQuestion];
  const progressPercentage = Math.round(((currentQuestion + 1) / quiz.length) * 100);

  return (
    <div className="page-wrap flex items-center justify-center">
      <motion.div
        className="page-content max-w-3xl"
        key={question.id}
        initial={{ opacity: 0, x: 45 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="glass-card p-6 sm:p-8 md:p-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="section-chip">Love Quiz</span>
            <span className="font-medium text-slate-500">
              Pertanyaan {currentQuestion + 1} dari {quiz.length}
            </span>
          </div>

          <div className="mb-6 h-2 overflow-hidden rounded-full bg-valentine-pink/30">
            <motion.div
              className="h-full bg-gradient-to-r from-valentine-rose to-valentine-red"
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>

          <h2 className="mb-7 text-2xl font-bold leading-snug text-slate-800 md:text-3xl">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={`${question.id}-${index}`}
                type="button"
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full rounded-2xl border px-5 py-4 text-left text-base font-medium transition ${getOptionClass(
                  index,
                  question.answer_index,
                )}`}
                whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizPage;
