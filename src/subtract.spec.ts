import { subtract } from './subtract';

describe('subtract function', () => {
  it('subtracts two positive numbers correctly', () => {
    const a = 10;
    const b = 4;

    const result = subtract(a, b);

    expect(result).toBe(6);
  });

  it('returns a negative result when the second number is greater', () => {
    const a = 3;
    const b = 8;

    const result = subtract(a, b);

    expect(result).toBe(-5);
  });

  it('returns the first number when subtracting zero', () => {
    const a = 7;
    const b = 0;

    const result = subtract(a, b);

    expect(result).toBe(7);
  });

  it('subtracts two negative numbers correctly', () => {
    const a = -5;
    const b = -2;

    const result = subtract(a, b);

    expect(result).toBe(-3);
  });

  it('subtracts two decimal numbers correctly', () => {
    const a = 5.5;
    const b = 2.5;

    const result = subtract(a, b);

    expect(result).toBe(3);
  });
});
