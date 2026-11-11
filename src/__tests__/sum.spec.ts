import { sum } from '../sum';

describe('Função sum', () => {
  test.each([
    { a: 2, b: 3, esperado: 5 },
    { a: -1, b: 1, esperado: 0 },
    { a: 0, b: 0, esperado: 0 },
  ])('deve retornar $esperado quando somar $a e $b', ({ a, b, esperado }) => {
    const resultado = sum(a, b);

    expect(resultado).toBe(esperado);
  });
});
