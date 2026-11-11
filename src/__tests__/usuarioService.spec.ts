import { criarUsuarioService } from '../usuarioService';

describe('Serviço de usuários', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve consultar o repositório e retornar o usuário quando ele existir', () => {
    const usuario = { id: 1, nome: 'Maria', email: 'maria@exemplo.com' };
    const repositorio = {
      buscarPorId: jest.fn().mockReturnValue(usuario),
    };
    const service = criarUsuarioService(repositorio);

    const resultado = service.buscarUsuario(1);

    expect(repositorio.buscarPorId).toHaveBeenCalled();
    expect(resultado).toEqual(usuario);
  });

  it('deve consultar o id correto quando buscar um usuário', () => {
    const usuario = { id: 2, nome: 'João', email: 'joao@exemplo.com' };
    const repositorio = {
      buscarPorId: jest.fn().mockReturnValue(usuario),
    };
    const service = criarUsuarioService(repositorio);

    service.buscarUsuario(2);

    expect(repositorio.buscarPorId).toHaveBeenCalledWith(2);
  });

  it('deve retornar null quando o repositório não encontrar o usuário', () => {
    const repositorio = {
      buscarPorId: jest.fn().mockReturnValue(null),
    };
    const service = criarUsuarioService(repositorio);

    const resultado = service.buscarUsuario(99);

    expect(resultado).toBeNull();
  });

  it('deve consultar o repositório uma vez quando buscar um usuário', () => {
    const usuario = { id: 1, nome: 'Maria', email: 'maria@exemplo.com' };
    const repositorio = {
      buscarPorId: jest.fn().mockReturnValue(usuario),
    };
    const service = criarUsuarioService(repositorio);

    service.buscarUsuario(1);

    expect(repositorio.buscarPorId).toHaveBeenCalledTimes(1);
  });

  it('deve retornar o usuário quando o repositório resolver a promessa', async () => {
    const usuario = { id: 1, nome: 'Maria', email: 'maria@exemplo.com' };
    const repositorio = {
      buscarPorId: jest.fn().mockResolvedValue(usuario),
    };
    const service = criarUsuarioService(repositorio);

    const resultado = await service.buscarUsuario(1);

    expect(resultado).toEqual(usuario);
  });
});
