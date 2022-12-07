import format from 'date-fns/format';

export function getFormattedDate(date) {
  return date && format(date, 'dd/MM/yyyy');
}
