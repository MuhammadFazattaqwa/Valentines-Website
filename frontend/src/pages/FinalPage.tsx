import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useMutation } from '@tanstack/react-query';
import { sendReply } from '../lib/api';

interface FinalPageProps {
  surpriseId: string;
}

const FinalPage = ({ surpriseId }: FinalPageProps) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFB6C1', '#FF69B4', '#FF1744'],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFB6C1', '#FF69B4', '#FF1744'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const mutation = useMutation({
    mutationFn: sendReply,
    onSuccess: () => {
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !message) {
      return;
    }

    mutation.mutate({
      surprise_id: surpriseId,
      sender_name: name,
      message,
    });
  };

  return (
    <div className="page-wrap flex items-center justify-center">
      <motion.div
        className="page-content max-w-2xl"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="glass-card px-6 py-8 sm:px-8 sm:py-10 md:px-11 md:py-11">
          {!submitted ? (
            <>
              <motion.div
                className="mb-7 text-center"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="section-chip mb-5">Final Touch</span>
                <h2 className="title-gradient mb-3 text-4xl font-extrabold leading-tight md:text-5xl">
                  Selamat Valentine! 🎉
                </h2>
                <p className="text-sm text-slate-600 md:text-base">
                  Tulis pesan balasan untuk orang spesialmu.
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="senderName" className="field-label">
                    Nama Kamu
                  </label>
                  <input
                    id="senderName"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="field-input"
                    placeholder="Tulis nama kamu"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="senderMessage" className="field-label">
                    Pesan Kamu
                  </label>
                  <textarea
                    id="senderMessage"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={5}
                    className="field-input resize-none"
                    placeholder="Tulis pesan manis di sini..."
                    required
                  />
                </div>

                {mutation.isError && (
                  <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    Gagal mengirim pesan. Coba lagi beberapa saat.
                  </p>
                )}

                <button type="submit" disabled={mutation.isPending} className="primary-btn w-full">
                  {mutation.isPending ? 'Mengirim...' : 'Kirim Pesan 💕'}
                </button>
              </form>
            </>
          ) : (
            <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="mb-3 text-5xl">💖</p>
              <h2 className="title-gradient mb-3 text-4xl font-bold">Terima Kasih!</h2>
              <p className="text-lg text-slate-700">Pesan kamu sudah terkirim dengan aman.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FinalPage;
