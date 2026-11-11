import { formatarNome } from '../formatador';

describe('Função formatarNome', () => {
  it('deve colocar a primeira letra em maiúscula quando receber maria', () => {
    const nome = 'maria';

    const resultado = formatarNome(nome);

    expect(resultado).toBe('Maria');
  });

  it('deve remover espaços das pontas quando receber um nome com espaços', () => {
    const nome = ' joão ';

    const resultado = formatarNome(nome);

    expect(resultado).toBe('João');
  });

  it('deve manter somente a inicial maiúscula quando receber ANA', () => {
    const nome = 'ANA';

    const resultado = formatarNome(nome);

    expect(resultado).toBe('Ana');
  });

  it('deve retornar um nome vazio quando receber texto vazio', () => {
    const nome = '';

    const resultado = formatarNome(nome);

    expect(resultado).toBe('');
  });
});
