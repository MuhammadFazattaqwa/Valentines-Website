import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type Viewport = {
  width: number;
  height: number;
};

const heartIcons = ['💖', '💕', '💗', '💓', '💞'];

const FloatingHearts = () => {
  const [viewport, setViewport] = useState<Viewport>({ width: 0, height: 0 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  const hearts = useMemo(() => {
    if (!viewport.width || !viewport.height) {
      return [];
    }

    return Array.from({ length: 12 }).map((_, index) => ({
      id: index,
      symbol: heartIcons[Math.floor(Math.random() * heartIcons.length)],
      size: Math.floor(Math.random() * 22) + 18,
      startX: Math.random() * viewport.width,
      endXOffset: Math.random() * 120 - 60,
      delay: Math.random() * 3.5,
      duration: Math.random() * 4 + 7,
      opacity: Math.random() * 0.35 + 0.35,
    }));
  }, [viewport.height, viewport.width]);

  if (!hearts.length) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ fontSize: `${heart.size}px` }}
          initial={{
            x: heart.startX,
            y: viewport.height + 120,
            opacity: heart.opacity,
          }}
          animate={{
            x: heart.startX + heart.endXOffset,
            y: -120,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          {heart.symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
