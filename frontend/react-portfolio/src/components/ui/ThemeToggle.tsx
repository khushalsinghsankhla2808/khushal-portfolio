import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50"
    >
      <button
        onClick={toggleTheme}
        data-cursor="hover"
        className={clsx(
          "relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
          "glass-card border border-borders shadow-lg hover:shadow-[0_0_25px_var(--color-glow)]",
          "hover:border-primary/50 hover:scale-110 group overflow-hidden"
        )}
        aria-label="Toggle theme"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <Sun 
            className={clsx(
              "absolute transition-all duration-500 ease-cubic-bezier(0.4,0,0.2,1) text-yellow-500 group-hover:text-yellow-400",
              theme === 'dark' ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
            )}
            size={24}
          />
          <Moon 
            className={clsx(
              "absolute transition-all duration-500 ease-cubic-bezier(0.4,0,0.2,1) text-primary group-hover:text-secondary",
              theme === 'light' ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
            )}
            size={24}
          />
        </div>
      </button>
    </motion.div>
  );
}
