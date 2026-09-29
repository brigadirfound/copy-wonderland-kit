// Цвета анимированного фона на первом экране (RGB, 0–1).
// Должны совпадать с --glow-1 / --glow-2 в src/index.css.

export type RGB = [number, number, number];

export const BG_RGB: RGB = [0.037, 0.037, 0.043];

export const HERO_GLOWS: [RGB, RGB, RGB] = [
  [0.42, 0.2, 1.0],
  [0.1, 0.42, 1.0],
  [0.86, 0.18, 0.88],
];
