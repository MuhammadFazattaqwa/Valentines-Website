import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed left-1/2 top-5 z-50 w-[92%] max-w-md -translate-x-1/2 transform">
      <div className="glass-card px-4 py-3 md:px-5 md:py-4">
        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          <span>Journey</span>
          <span>
            {currentStep} / {totalSteps}
          </span>
        </div>

        <div className="relative mb-3 h-2 overflow-hidden rounded-full bg-valentine-pink/30">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-valentine-rose to-valentine-red"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <motion.div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i < currentStep
                  ? 'bg-gradient-to-r from-valentine-rose to-valentine-red'
                  : 'bg-slate-200'
              }`}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: i < currentStep ? 1 : 0.45 }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
