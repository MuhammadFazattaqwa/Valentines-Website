import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) {
      return;
    }

    try {
      setIsBusy(true);
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Failed to toggle music:', error);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music/Musik.mp3" type="audio/mpeg" />
      </audio>
      <motion.button
        onClick={toggleMusic}
        disabled={isBusy}
        className="fixed bottom-6 right-6 z-50 rounded-full border border-white/70 bg-white/85 p-3.5 text-xl text-valentine-red shadow-[0_18px_34px_-18px_rgba(146,24,74,0.85)] backdrop-blur-md transition hover:bg-white md:bottom-8 md:right-8 md:p-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? '🔊' : '🔈'}
      </motion.button>
    </>
  );
};

export default MusicToggle;
