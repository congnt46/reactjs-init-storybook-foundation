import format from 'date-fns/format';

const MONTHS = Array.from({ length: 12 }, (value, key) => {
  const date = new Date().setMonth(key);
  return format(date, 'MMMM');
});

export default MONTHS;
