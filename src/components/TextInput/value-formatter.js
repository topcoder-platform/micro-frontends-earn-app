export const currencyCommas = (val) => parseInt(val, 10)
  .toLocaleString('en-US', {minimumFractionDigits: 0});