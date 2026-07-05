// Shared animation configuration and reduced-motion detection for anime.js animations

export const DURATION_FAST = 400;
export const DURATION_BASE = 700;
export const DURATION_SLOW = 1000;
export const EASE_DEFAULT = 'outExpo';
export const STAGGER_DELAY = 80;

export const REDUCED_MOTION = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;
