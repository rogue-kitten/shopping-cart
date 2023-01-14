const CURRENY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'EUR',
  style: 'currency',
});

export function formatCurrency(price: number | undefined) {
  if (price) return CURRENY_FORMATTER.format(price);
  return 0;
}
