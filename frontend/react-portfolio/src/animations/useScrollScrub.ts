import { useEffect } from 'react';
import type { RefObject } from 'react';
import { onScroll } from 'animejs';
import { REDUCED_MOTION } from './config';

export interface UseScrollScrubOptions {
  container?: string | HTMLElement | RefObject<HTMLElement | null>;
  axis?: 'x' | 'y';
  enter?: string | number | ((self: any) => any);
  leave?: string | number | ((self: any) => any);
  sync?: boolean | number | string;
  onUpdate?: (progress: number, velocity: number) => void;
  animation?: any;
}

export function useScrollScrub(
  targetRef: RefObject<HTMLElement | null>,
  options: UseScrollScrubOptions = {}
): void {
  const {
    container,
    axis = 'y',
    enter = 'top bottom',
    leave = 'bottom top',
    sync = true,
    onUpdate,
    animation,
  } = options;

  useEffect(() => {
    const target = targetRef.current;
    if (!target || REDUCED_MOTION) return;

    let resolvedContainer: any = undefined;
    if (container) {
      if (typeof container === 'object' && 'current' in container) {
        resolvedContainer = container.current;
      } else {
        resolvedContainer = container;
      }
    }

    const observer = onScroll({
      target,
      container: resolvedContainer,
      axis,
      enter: enter as any,
      leave: leave as any,
      sync,
      onUpdate: (self) => {
        if (onUpdate) {
          onUpdate(self.progress, self.velocity);
        }
      },
    });

    if (animation) {
      observer.link(animation);
    }

    return () => {
      observer.revert();
    };
  }, [targetRef, container, axis, enter, leave, sync, onUpdate, animation]);
}
