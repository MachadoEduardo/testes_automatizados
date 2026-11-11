import { subtract } from '../subtract';

describe('Função subtract', () => {
  it('deve retornar 3 quando subtrair 2 de 5', () => {
    const a = 5;
    const b = 2;

    const resultado = subtract(a, b);

    expect(resultado).toBe(3);
  });

  it('deve retornar 6 quando subtrair 4 de 10', () => {
    const a = 10;
    const b = 4;

    const result = subtract(a, b);

    expect(result).toBe(6);
  });

  it('deve retornar um número negativo quando o segundo número for maior', () => {
    const a = 3;
    const b = 8;

    const result = subtract(a, b);

    expect(result).toBe(-5);
  });

  it('deve manter o primeiro número quando subtrair zero', () => {
    const a = 7;
    const b = 0;

    const result = subtract(a, b);

    expect(result).toBe(7);
  });

  it('deve retornar -3 quando subtrair -2 de -5', () => {
    const a = -5;
    const b = -2;

    const result = subtract(a, b);

    expect(result).toBe(-3);
  });

  it('deve retornar 3 quando subtrair 2.5 de 5.5', () => {
    const a = 5.5;
    const b = 2.5;

    const result = subtract(a, b);

    expect(result).toBe(3);
  });
});
