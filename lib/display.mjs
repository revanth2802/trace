const number = new Intl.NumberFormat('en-US', {maximumFractionDigits: 6});
export function formatEvidenceValue(field) {
  const value = field.value;
  if (value === null || value === undefined) return 'Not provided';
  if (field.value_type === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value !== 'number') return String(value);
  if (field.value_type === 'money') {
    const currency = /sek/i.test(field.field + ' ' + field.label) ? 'SEK' : 'USD';
    return new Intl.NumberFormat('en-US', {style:'currency', currency, currencyDisplay:currency==='SEK'?'code':'symbol', maximumFractionDigits:2}).format(value);
  }
  if (field.value_type === 'percent') return new Intl.NumberFormat('en-US', {style:'percent', maximumFractionDigits:3}).format(value);
  const suffix = /mile/i.test(field.field + ' ' + field.label) ? ' mi' : '';
  return number.format(value) + suffix;
}
