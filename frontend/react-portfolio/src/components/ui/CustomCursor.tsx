import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/**
 * Custom cursor: a small solid dot tracks the mouse exactly, while a
 * larger ring trails behind with spring physics. Hovering any element
 * tagged with `data-cursor="hover"` grows the ring and fades the dot,
 * signalling "this is clickable" without any glow or color change.
 *
 * Automatically disables itself on touch/coarse-pointer devices.
 */
export default function CustomCursor() {

  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  const ringX = useSpring(dotX, { stiffness: 400, damping: 35, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 400, damping: 35, mass: 0.5 });

  const hoverTargetCount = useRef(0);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return;
    setEnabled(true);

    const handleMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleLeaveWindow = () => setIsVisible(false);

    const isHoverTarget = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return null;
      return el.closest('[data-cursor="hover"]');
    };

    const handleOver = (e: MouseEvent) => {
      if (isHoverTarget(e.target)) {
        hoverTargetCount.current += 1;
        setIsHovering(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      if (isHoverTarget(e.target)) {
        hoverTargetCount.current = Math.max(0, hoverTargetCount.current - 1);
        if (hoverTargetCount.current === 0) setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseout', handleLeaveWindow);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseout', handleLeaveWindow);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.body.classList.remove('custom-cursor-active');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled || isTouchDevice) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-9999"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 200ms ease' }}
    >
      {/* Solid dot: tracks the pointer exactly, no lag */}
      <motion.div
        className="fixed left-0 top-0 rounded-full bg-text-primary"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isHovering ? 0 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Outer ring: trails with spring easing, grows on hover */}
      <motion.div
        className="fixed left-0 top-0 rounded-full border border-text-primary/70"
        style={{
          x: ringX,
          y: ringY,
          width: 32,
          height: 32,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.75 : 1,
          opacity: isHovering ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
}
