import detectPaymentSystem from '../src/js/detectPaymentSystem';

describe('Payment System Detection', () => {
  test('detects Visa', () => {
    expect(detectPaymentSystem('4111111111111111')).toBe('visa');
  });

  test('detects Mastercard', () => {
    expect(detectPaymentSystem('5555555555554444')).toBe('mastercard');
  });

  test('detects Мир', () => {
    expect(detectPaymentSystem('2200123456789012')).toBe('mir');
  });

  test('detects Amex', () => {
    expect(detectPaymentSystem('340000000000009')).toBe('amex');
    expect(detectPaymentSystem('370000000000002')).toBe('amex');
  });

  test('detects Discover', () => {
    expect(detectPaymentSystem('6011000000000004')).toBe('discover');
  });

  test('detects Diners', () => {
    expect(detectPaymentSystem('36000000000008')).toBe('diners');
  });

  test('detects JCB', () => {
    expect(detectPaymentSystem('3528000000000000')).toBe('jcb');
  });

  test('returns undefined for unknown', () => {
    expect(detectPaymentSystem('123456')).toBeUndefined();
  });

  test('empty string returns undefined', () => {
    expect(detectPaymentSystem('')).toBeUndefined();
  });
});
