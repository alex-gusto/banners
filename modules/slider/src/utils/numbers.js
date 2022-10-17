const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

const floatStrip = (n) => parseFloat(n.toPrecision(12));

export const Numbers = {
  clamp,
  clampProgress: (n) => clamp(n, 0, 1),
  floatStrip,
};
