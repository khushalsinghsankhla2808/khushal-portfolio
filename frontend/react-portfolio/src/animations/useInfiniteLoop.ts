import { useEffect } from 'react';
import type { RefObject } from 'react';
import { animate } from 'animejs';
import { REDUCED_MOTION } from './config';

export interface UseInfiniteLoopOptions {
  scale?: number | string | (number | string)[];
  rotate?: number | string | (number | string)[];
  opacity?: number | string | (number | string)[];
  duration?: number;
  easing?: string;
  alternate?: boolean;
  enabled?: boolean;
}

export function useInfiniteLoop(
  ref: RefObject<HTMLElement | null>,
  options: UseInfiniteLoopOptions = {}
): void {
  const {
    scale,
    rotate,
    opacity,
    duration = 4000,
    easing = 'inOutSine',
    alternate = true,
    enabled = true,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled || REDUCED_MOTION) return;

    const animationParams: any = {
      duration,
      ease: easing,
      loop: true,
      alternate,
    };

    if (scale !== undefined) animationParams.scale = scale;
    if (rotate !== undefined) animationParams.rotate = rotate;
    if (opacity !== undefined) animationParams.opacity = opacity;

    const anim = animate(element, animationParams);

    return () => {
      anim.revert();
    };
  }, [ref, scale, rotate, opacity, duration, easing, alternate, enabled]);
}
