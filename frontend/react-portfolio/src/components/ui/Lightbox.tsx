import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  
  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    onNavigate((currentIndex + 1) % images.length);
  }, [images.length, currentIndex, onNavigate]);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [images.length, currentIndex, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-background/95"
          onClick={onClose}
        >
          {/* Controls */}
          <div className="absolute top-6 right-6 z-50 flex gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="p-3 bg-cards/50 hover:bg-cards border border-borders rounded-full text-text-secondary hover:text-text-primary transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {images.length > 1 && (
            <>
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-cards/50 hover:bg-cards border border-borders rounded-full text-text-secondary hover:text-text-primary transition-all"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 bg-cards/50 hover:bg-cards border border-borders rounded-full text-text-secondary hover:text-text-primary transition-all"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Image Container */}
          <div 
            className="relative w-full h-full p-4 md:p-12 flex items-center justify-center cursor-zoom-in group"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={images[currentIndex]}
              alt={`Gallery Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-cards/90 border border-borders rounded-full text-text-secondary text-sm font-medium flex items-center gap-2">
               <ZoomIn size={16} /> Click outside or press ESC to close {images.length > 1 && `(${currentIndex + 1} / ${images.length})`}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
