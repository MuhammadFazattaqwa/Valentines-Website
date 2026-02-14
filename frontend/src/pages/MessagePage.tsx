import { motion } from 'framer-motion';

interface MessagePageProps {
  onNext: () => void;
  message: string;
}

const MessagePage = ({ onNext, message }: MessagePageProps) => {
  return (
    <div className="page-wrap flex items-center justify-center">
      <motion.div
        className="page-content max-w-3xl"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="glass-card px-6 py-9 sm:px-8 md:px-12 md:py-11">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="section-chip mb-5">Special Message</span>
            <h2 className="title-gradient text-4xl font-bold md:text-5xl">Pesan Spesial 💌</h2>
          </motion.div>

          <motion.p
            className="mb-9 rounded-2xl bg-white/70 p-5 text-base leading-relaxed text-slate-700 shadow-inner shadow-white/60 whitespace-pre-wrap md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {message}
          </motion.p>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <button onClick={onNext} className="primary-btn" type="button">
              Lanjut 💕
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MessagePage;
