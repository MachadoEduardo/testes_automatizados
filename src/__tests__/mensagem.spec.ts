import { getMensagemBoasVindas } from '../mensagem';

describe('Função getMensagemBoasVindas', () => {
  it('deve gerar a mensagem de boas-vindas quando receber o nome Maria', () => {
    const nome = 'Maria';

    const resultado = getMensagemBoasVindas(nome);

    expect(resultado).toMatchSnapshot();
  });
});
