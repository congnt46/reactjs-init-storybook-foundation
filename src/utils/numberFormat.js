const DEFAULT_CURRENCY = '£';

export function formatNumberWithCommas(value) {
  if (typeof value !== 'number') { return ''; }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatCurrency(value, currency = DEFAULT_CURRENCY) {
  if (value.toString().length > 0) {
    return `${currency} ${value}`;
  } else {
    return value;
  }
}

export function floorTo(value, target) {
  return Math.floor(value / target) * target;
}

export function ceilTo(value, target) {
  return Math.ceil(value / target) * target;
}

export function formatMoney(value) {
  const formattedNumber = formatNumberWithCommas(value);
  return formatCurrency(formattedNumber);
}

export function formatMoneyShort(value) {
  const shortNumber = formatPrice(value);
  return formatCurrency(shortNumber);
}

export function formatPrice(price, { precisionK = 0, precisionM = 1, precisionB = 2, precisionT = 2 } = {}) {
  if (price > 10e11) {
    return `${(price / 10e11).toFixed(precisionT)}T`;
  } else if (price > 10e8) {
    return `${(price / 10e8).toFixed(precisionB)}B`;
  } else if (price > 10e5) {
    return `${(price / 10e5).toFixed(precisionM)}M`;
  } else if (price > 10e2) {
    return `${(price / 10e2).toFixed(precisionK)}k`;
  } else if (price === 0) {
    return '';
  } else {
    return price;
  }
}

export function formatPercent(value, precision = 1) {
  return `${value.toFixed(precision)}%`;
}

export function parseIntWithCommas(value) {
  if (!value) { return; }
  const number = parseFloat(value.replace(/,/g, ''));
  return Number.isNaN(number) ? null : number;
}
