import { buscarDados, buscarDadosComErro } from '../buscarDados';

describe('Função buscarDados', () => {
  it('deve resolver com o objeto completo quando buscar os dados', async () => {
    expect.assertions(1);

    const promessa = buscarDados();

    await expect(promessa).resolves.toEqual({ ok: true });
  });

  it('deve possuir a propriedade ok quando resolver a promessa', async () => {
    const promessa = buscarDados();

    await expect(promessa).resolves.toHaveProperty('ok');
  });

  it('deve conter ok verdadeiro quando resolver a promessa', async () => {
    const promessa = buscarDados();

    await expect(promessa).resolves.toMatchObject({ ok: true });
  });

  it('deve retornar uma promessa quando chamar a função', () => {
    const resultado = buscarDados();

    expect(resultado).toBeInstanceOf(Promise);
  });

  it('deve retornar o objeto esperado quando aguardar com await', async () => {
    const resultado = await buscarDados();

    expect(resultado).toEqual({ ok: true });
  });
});

describe('Função buscarDadosComErro', () => {
  it('deve rejeitar com a mensagem esperada quando a busca falhar', async () => {
    const promessa = buscarDadosComErro();

    await expect(promessa).rejects.toThrow('falha ao buscar dados');
  });

  it('deve rejeitar com uma instância de Error quando a busca falhar', async () => {
    const promessa = buscarDadosComErro();

    await expect(promessa).rejects.toBeInstanceOf(Error);
  });

  it('deve capturar o tipo e a mensagem quando usar try e catch', async () => {
    expect.assertions(2);

    try {
      await buscarDadosComErro();
    } catch (erro) {
      expect(erro).toBeInstanceOf(Error);
      expect(erro).toHaveProperty('message', 'falha ao buscar dados');
    }
  });
});
