export default function detectPaymentSystem(cardNumber) {
  if (!cardNumber) return undefined;

  const sanitized = cardNumber.replace(/\s+/g, '');
  const firstDigit = sanitized[0];
  const firstTwo = sanitized.slice(0, 2);
  const firstFour = sanitized.slice(0, 4);
  const len = sanitized.length;

  // Visa: 4
  if (firstDigit === '4') return 'visa';

  // Mastercard: 51-55
  if (firstTwo >= '51' && firstTwo <= '55') return 'mastercard';

  // Мир: 2200-2204
  if (firstFour >= '2200' && firstFour <= '2204') return 'mir';

  // Amex: 34 or 37
  if (firstTwo === '34' || firstTwo === '37') return 'amex';

  // Discover: 6011
  if (firstFour === '6011') return 'discover';

  // Diners Club: 36
  if (firstTwo === '36') return 'diners';

  // JCB: 35
  if (firstTwo === '35') return 'jcb';

  return undefined; 
}
