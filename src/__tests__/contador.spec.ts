import { incrementar, obterValor, reiniciar } from '../contador';

describe('Contador com beforeEach', () => {
  beforeEach(() => {
    reiniciar();
  });

  afterEach(() => {
    console.log('valor ao final do teste:', obterValor());
  });

  it('deve retornar 0 quando iniciar um teste sem incrementos', () => {
    const resultado = obterValor();

    expect(resultado).toBe(0);
  });

  it('deve retornar 3 quando incrementar três vezes', () => {
    incrementar();
    incrementar();

    const resultado = incrementar();

    expect(resultado).toBe(3);
  });

  it('deve retornar 1 quando incrementar uma vez', () => {
    const resultado = incrementar();

    expect(resultado).toBe(1);
  });
});
