import { subtract } from './subtract';

export function montarOperacao(a: number, b: number) {
  return {
    operacao: 'subtração',
    valores: [a, b],
    resultado: subtract(a, b),
  };
}
