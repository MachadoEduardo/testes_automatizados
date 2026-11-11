import { divide } from '../divide';

describe('Função divide', () => {
  it('deve retornar 5 quando dividir 10 por 2', () => {
    const a = 10;
    const b = 2;

    const result = divide(a, b);

    expect(result).toBe(5);
  });

  it('deve lançar um erro quando dividir por zero', () => {
    const a = 10;
    const b = 0;

    const operation = () => divide(a, b);

    expect(operation).toThrow();
  });

  it('deve lançar a mensagem de divisão por zero quando o divisor for zero', () => {
    const a = 10;
    const b = 0;

    const operation = () => divide(a, b);

    expect(operation).toThrow('divisão por zero');
  });

  it('deve incluir zero na mensagem quando comparar com uma expressão regular', () => {
    const a = 10;
    const b = 0;

    const operation = () => divide(a, b);

    expect(operation).toThrow(/zero/);
  });

  it('deve lançar uma instância de Error quando dividir por zero', () => {
    const a = 10;
    const b = 0;

    const operation = () => divide(a, b);

    expect(operation).toThrow(Error);
  });

  it('deve retornar -5 quando dividir -10 por 2', () => {
    const a = -10;
    const b = 2;

    const result = divide(a, b);

    expect(result).toBe(-5);
  });

  it('deve retornar 0 quando dividir 0 por 5', () => {
    const a = 0;
    const b = 5;

    const result = divide(a, b);

    expect(result).toBe(0);
  });

  it('deve retornar 3.5 quando dividir 7 por 2', () => {
    const a = 7;
    const b = 2;

    const result = divide(a, b);

    expect(result).toBe(3.5);
  });

  it('deve concluir sem erro quando dividir 10 por 5', () => {
    const a = 10;
    const b = 5;

    const operation = () => divide(a, b);

    expect(operation).not.toThrow();
  });
});
