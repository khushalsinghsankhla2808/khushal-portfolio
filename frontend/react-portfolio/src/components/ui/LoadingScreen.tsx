import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Accelerate towards the end
      const increment = currentProgress > 80 ? 2 : Math.floor(Math.random() * 15) + 5;
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(onComplete, 400); // short pause at 100%
      }
      setProgress(currentProgress);
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-100 bg-background flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] bg-secondary/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '0.7s' }} />
      
      {/* Logo container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mb-16"
      >
        <img 
          src="/logo.png" 
          className="h-14 md:h-20 w-auto object-contain" 
        />
      </motion.div>
      
      {/* Loading Progress */}
      <div className="relative z-10 flex flex-col items-center w-64 md:w-80">
        <div className="flex justify-between w-full mb-4 text-text-secondary font-mono text-[10px] md:text-xs tracking-widest uppercase">
          <span>Loading Portfolio...</span>
          <span className="text-white font-bold">{progress}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
