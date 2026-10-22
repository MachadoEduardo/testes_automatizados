import { sum } from './sum';

describe('sum function', () => {
  it('should add two numbers correctly', () => {
    const result = sum(2, 3);

    expect(result).toBe(5);
  });
});
