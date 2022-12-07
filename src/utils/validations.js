export function validateMinMax({ min, max }) {
  return typeof min !== 'number' || typeof max !== 'number' || max > min;
}
