import luhnCheck from '../src/js/luhn';

describe('Luhn Algorithm', () => {
  test('valid card number passes the check', () => {
    expect(luhnCheck('4539148803436467')).toBe(true);
  });

  test('invalid card number fails the check', () => {
    expect(luhnCheck('4539148803436468')).toBe(false);
  });

  test('empty string returns false', () => {
    expect(luhnCheck('')).toBe(false);
  });

  test('string with spaces is handled correctly', () => {
    expect(luhnCheck('4539 1488 0343 6467')).toBe(true);
  });

  test('non-digit characters return false', () => {
    expect(luhnCheck('4111a11111111111')).toBe(false);
  });
});
