import { filtrarPares } from '../filtrarPares';

describe('Função filtrarPares', () => {
  it('deve manter a ordem dos pares quando receber números misturados', () => {
    const numeros = [1, 2, 3, 4, 5, 6];

    const resultado = filtrarPares(numeros);

    expect(resultado).toEqual([2, 4, 6]);
  });

  it('deve retornar um array vazio quando receber somente ímpares', () => {
    const numeros = [1, 3, 5];

    const resultado = filtrarPares(numeros);

    expect(resultado).toEqual([]);
  });

  it('deve retornar um array vazio quando receber um array vazio', () => {
    const numeros: number[] = [];

    const resultado = filtrarPares(numeros);

    expect(resultado).toEqual([]);
  });

  it('deve incluir zero e pares negativos quando estiverem no array', () => {
    const numeros = [-4, -3, 0, 7];

    const resultado = filtrarPares(numeros);

    expect(resultado).toEqual([-4, 0]);
  });

  it('deve conter 12 quando receber os números 10, 11 e 12', () => {
    const numeros = [10, 11, 12];

    const resultado = filtrarPares(numeros);

    expect(resultado).toContain(12);
  });

  it('deve ter quatro elementos quando receber quatro números pares', () => {
    const numeros = [2, 4, 6, 8];

    const resultado = filtrarPares(numeros);

    expect(resultado).toHaveLength(4);
  });

  it('deve excluir 2 quando receber somente ímpares', () => {
    const numeros = [1, 3, 5];

    const resultado = filtrarPares(numeros);

    expect(resultado).not.toContain(2);
  });

  it('deve comparar o conteúdo quando os arrays tiverem referências diferentes', () => {
    const numeros = [1, 2, 3, 4];

    const resultado = filtrarPares(numeros);

    expect(resultado).toEqual([2, 4]);
  });
});
