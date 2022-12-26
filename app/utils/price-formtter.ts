export const formatCurrency = (
  price: number | string = 0,
  currency: string = 'USD'
) =>
  Intl.NumberFormat('en-ie', {
    style: 'currency',
    currency,
    notation: 'standard',
  }).format(Number(price));
