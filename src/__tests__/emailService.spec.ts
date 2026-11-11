import { criarEnviarEmail } from '../emailService';

describe('Função enviarEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar sucesso quando chamar a API com o email e o assunto corretos', () => {
    const apiEnviar = jest.fn().mockReturnValue(true);
    const enviarEmail = criarEnviarEmail(apiEnviar);
    const usuario = { nome: 'Maria', email: 'maria@exemplo.com' };

    const resultado = enviarEmail(usuario);

    expect(apiEnviar).toHaveBeenCalled();
    expect(apiEnviar).toHaveBeenCalledWith('maria@exemplo.com', 'Bem-vindo!');
    expect(resultado).toBe(true);
  });

  it('deve chamar a API uma vez quando enviar um email', () => {
    const apiEnviar = jest.fn().mockReturnValue(true);
    const enviarEmail = criarEnviarEmail(apiEnviar);
    const usuario = { nome: 'Maria', email: 'maria@exemplo.com' };

    enviarEmail(usuario);

    expect(apiEnviar).toHaveBeenCalledTimes(1);
  });

  it('deve usar o email correspondente quando enviar para dois usuários', () => {
    const apiEnviar = jest.fn().mockReturnValue(true);
    const enviarEmail = criarEnviarEmail(apiEnviar);
    const maria = { nome: 'Maria', email: 'maria@exemplo.com' };
    const joao = { nome: 'João', email: 'joao@exemplo.com' };

    enviarEmail(maria);
    enviarEmail(joao);

    expect(apiEnviar).toHaveBeenNthCalledWith(1, 'maria@exemplo.com', 'Bem-vindo!');
    expect(apiEnviar).toHaveBeenNthCalledWith(2, 'joao@exemplo.com', 'Bem-vindo!');
  });

  it('deve propagar o erro quando a API rejeitar o envio', async () => {
    const apiEnviar = jest.fn().mockRejectedValue(new Error('falha ao enviar email'));
    const enviarEmail = criarEnviarEmail(apiEnviar);
    const usuario = { nome: 'Maria', email: 'maria@exemplo.com' };

    const promessa = enviarEmail(usuario);

    await expect(promessa).rejects.toThrow('falha ao enviar email');
  });

  it('deve resolver com sucesso quando a API concluir o envio assíncrono', async () => {
    const apiEnviar = jest.fn().mockResolvedValue(true);
    const enviarEmail = criarEnviarEmail(apiEnviar);
    const usuario = { nome: 'Maria', email: 'maria@exemplo.com' };

    const resultado = await enviarEmail(usuario);

    expect(resultado).toBe(true);
  });
});
