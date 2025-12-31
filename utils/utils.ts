export const baseUrl = process.env.BASE_URL
  ? `https://${process.env.BASE_URL}`
  : 'http://localhost:3000';

export const getFormattedPrice = (
  amount?: number,
  currencyCode: string = 'USD'
): string | undefined => {
  if (!amount) {
    return;
  }
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol',
  }).format(amount / 100);
};
