import { criarUsuario } from '../criarUsuario';

describe('Função criarUsuario', () => {
  it('deve retornar o objeto completo quando receber nome e idade', () => {
    const nome = 'Maria';
    const idade = 30;

    const resultado = criarUsuario(nome, idade);

    expect(resultado).toEqual({ id: expect.any(String), nome: 'Maria', idade: 30 });
  });

  it('deve possuir a propriedade nome quando criar o usuário', () => {
    const nome = 'Maria';
    const idade = 30;

    const resultado = criarUsuario(nome, idade);

    expect(resultado).toHaveProperty('nome');
  });

  it('deve ter idade 30 quando receber essa idade', () => {
    const nome = 'Maria';
    const idade = 30;

    const resultado = criarUsuario(nome, idade);

    expect(resultado).toHaveProperty('idade', 30);
  });

  it('deve conter nome e idade quando comparar apenas esses campos', () => {
    const nome = 'Maria';
    const idade = 30;

    const resultado = criarUsuario(nome, idade);

    expect(resultado).toMatchObject({ nome: 'Maria', idade: 30 });
  });

  it('deve ter um nome não vazio quando receber Maria', () => {
    const nome = 'Maria';
    const idade = 30;

    const resultado = criarUsuario(nome, idade);

    expect(resultado.nome).toBeTruthy();
  });

  it('deve gerar ids diferentes quando criar dois usuários', () => {
    const nome = 'Maria';
    const idade = 30;

    const primeiroUsuario = criarUsuario(nome, idade);
    const segundoUsuario = criarUsuario(nome, idade);

    expect(primeiroUsuario.id).not.toBe(segundoUsuario.id);
  });
});
