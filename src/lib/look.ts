// Цветовые «луки» сайта. Выбранный лук ставится атрибутом data-look на <html>.
// Для превью можно открыть сайт с параметром ?look=ocean или ?look=sunset.

export type Look = "lime" | "ocean" | "sunset";
export type RGB = [number, number, number];

export const DEFAULT_LOOK: Look = "lime";

export const BG_RGB: RGB = [0.037, 0.037, 0.043];

export const lookPalettes: Record<Look, [RGB, RGB, RGB]> = {
  lime: [
    [0.42, 0.2, 1.0],
    [0.1, 0.42, 1.0],
    [0.86, 0.18, 0.88],
  ],
  ocean: [
    [0.07, 0.22, 0.9],
    [0.0, 0.78, 0.95],
    [0.62, 0.48, 1.0],
  ],
  sunset: [
    [0.9, 0.12, 0.32],
    [1.0, 0.45, 0.16],
    [1.0, 0.78, 0.28],
  ],
};

const isLook = (value: unknown): value is Look =>
  typeof value === "string" && value in lookPalettes;

export function initLook() {
  let look: Look = DEFAULT_LOOK;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("look");
    const stored = sessionStorage.getItem("look");
    if (isLook(fromUrl)) {
      look = fromUrl;
      sessionStorage.setItem("look", fromUrl);
    } else if (isLook(stored)) {
      look = stored;
    }
  } catch {
    // sessionStorage может быть недоступен — остаёмся на луке по умолчанию
  }
  document.documentElement.dataset.look = look;
}

export function currentLook(): Look {
  const look = document.documentElement.dataset.look;
  return isLook(look) ? look : DEFAULT_LOOK;
}
