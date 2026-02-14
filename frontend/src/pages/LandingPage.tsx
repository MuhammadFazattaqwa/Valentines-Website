import { motion } from 'framer-motion';
import FloatingHearts from '../components/FloatingHearts';

interface LandingPageProps {
  onNext: () => void;
  recipientName: string;
}

const LandingPage = ({ onNext, recipientName }: LandingPageProps) => {
  return (
    <div className="page-wrap flex items-center justify-center">
      <FloatingHearts />

      <motion.div
        className="page-content max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="glass-card px-6 py-10 text-center sm:px-8 md:px-12 md:py-12">
          <motion.span
            className="section-chip mb-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Made with Love
          </motion.span>

          <motion.h1
            className="title-gradient mb-4 text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.65 }}
          >
            Happy Valentine
          </motion.h1>

          <motion.p
            className="mb-3 text-lg font-medium text-slate-600 md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            Untuk Natasya Rachmawati <span className="font-bold text-valentine-red">{recipientName}</span>
          </motion.p>

          <motion.p
            className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Ada beberapa halaman spesial yang sudah disiapkan buat kamu. Klik tombol di bawah
            dan nikmati kejutan kecilnya.
          </motion.p>

          <motion.button
            onClick={onNext}
            className="primary-btn mt-8"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Buka Kejutan 🎁
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
