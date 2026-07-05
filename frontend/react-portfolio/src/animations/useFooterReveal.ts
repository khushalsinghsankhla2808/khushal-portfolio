import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { animate } from 'animejs';
import { REDUCED_MOTION, DURATION_BASE, EASE_DEFAULT } from './config';

export interface UseFooterRevealOptions {
  delay?: number;
  duration?: number;
  easing?: string;
  distance?: number;
}

export function useFooterReveal(
  ref: RefObject<HTMLElement | null>,
  options: UseFooterRevealOptions = {}
): void {
  const {
    delay = 0,
    duration = DURATION_BASE,
    easing = EASE_DEFAULT,
    distance = 20,
  } = options;

  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || REDUCED_MOTION || hasAnimated.current) return;

    // Initialize hidden state
    element.style.opacity = '0';
    element.style.transform = `translateY(${distance}px)`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animate(element, {
              opacity: [0, 1],
              translateY: [distance, 0],
              duration: duration,
              delay: delay,
              ease: easing,
            });
            // Unobserve immediately so entry animation runs once only
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, delay, duration, easing, distance]);
}

