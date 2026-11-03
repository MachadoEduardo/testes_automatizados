import { divide } from '../divide';

describe('divide function', () => {
  it('returns five when dividing ten by two', () => {
    const a = 10;
    const b = 2;

    const result = divide(a, b);

    expect(result).toBe(5);
  });

  it('throws an error when dividing by zero', () => {
    const a = 10;
    const b = 0;

    const operation = () => divide(a, b);

    expect(operation).toThrow();
  });

  it('throws an error containing the division by zero message', () => {
    const a = 10;
    const b = 0;

    const operation = () => divide(a, b);

    expect(operation).toThrow('divisão por zero');
  });

  it('throws an error whose message matches the zero expression', () => {
    const a = 10;
    const b = 0;

    const operation = () => divide(a, b);

    expect(operation).toThrow(/zero/);
  });

  it('throws an instance of Error when dividing by zero', () => {
    const a = 10;
    const b = 0;

    const operation = () => divide(a, b);

    expect(operation).toThrow(Error);
  });

  it('returns a negative result when dividing a negative number', () => {
    const a = -10;
    const b = 2;

    const result = divide(a, b);

    expect(result).toBe(-5);
  });

  it('returns zero when dividing zero by five', () => {
    const a = 0;
    const b = 5;

    const result = divide(a, b);

    expect(result).toBe(0);
  });

  it('returns a decimal result when dividing seven by two', () => {
    const a = 7;
    const b = 2;

    const result = divide(a, b);

    expect(result).toBe(3.5);
  });

  it('does not throw an error when dividing ten by five', () => {
    const a = 10;
    const b = 5;

    const operation = () => divide(a, b);

    expect(operation).not.toThrow();
  });
});
