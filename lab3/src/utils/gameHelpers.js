export function clamp(value, min, max) {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

export function getRandomSwipePoints() {
  return Math.floor(Math.random() * 8) + 1;
}

export function getSwipeDirection(translationX) {
  return translationX < 0 ? 'left' : 'right';
}

export function getPinchBonus(scale) {
  const normalized = Math.max(scale - 1, 0);
  return Math.max(1, Math.round(normalized * 10));
}
