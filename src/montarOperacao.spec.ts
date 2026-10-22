import { montarOperacao } from './montarOperacao';

describe('montarOperacao function', () => {
  it('returns the operation name', () => {
    const a = 10;
    const b = 4;

    const operation = montarOperacao(a, b);

    expect(operation.operacao).toBe('subtração');
  });

  it('returns the operation data and result', () => {
    const a = 10;
    const b = 4;

    const operation = montarOperacao(a, b);

    expect(operation).toEqual({
      operacao: 'subtração',
      valores: [10, 4],
      resultado: 6,
    });
  });

  it('includes the second number in the values', () => {
    const a = 10;
    const b = 4;

    const operation = montarOperacao(a, b);

    expect(operation.valores).toContain(4);
  });

  it('returns a defined operation object', () => {
    const a = 10;
    const b = 4;

    const operation = montarOperacao(a, b);

    expect(operation).toBeTruthy();
  });
});
