import { montarOperacao } from '../montarOperacao';

describe('Função montarOperacao', () => {
  it('deve identificar a subtração quando montar a operação', () => {
    const a = 10;
    const b = 4;

    const operation = montarOperacao(a, b);

    expect(operation.operacao).toBe('subtração');
  });

  it('deve retornar os dados e o resultado quando receber 10 e 4', () => {
    const a = 10;
    const b = 4;

    const operation = montarOperacao(a, b);

    expect(operation).toEqual({
      operacao: 'subtração',
      valores: [10, 4],
      resultado: 6,
    });
  });

  it('deve incluir o segundo número nos valores quando montar a operação', () => {
    const a = 10;
    const b = 4;

    const operation = montarOperacao(a, b);

    expect(operation.valores).toContain(4);
  });

  it('deve retornar um objeto verdadeiro quando montar a operação', () => {
    const a = 10;
    const b = 4;

    const operation = montarOperacao(a, b);

    expect(operation).toBeTruthy();
  });
});
