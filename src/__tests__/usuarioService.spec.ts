import { criarUsuarioService } from '../usuarioService';

describe('usuarioService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls the repository and returns the user found', () => {
    const usuario = { id: 1, nome: 'Maria', email: 'maria@exemplo.com' };
    const repositorio = {
      buscarPorId: jest.fn().mockReturnValue(usuario),
    };
    const service = criarUsuarioService(repositorio);

    const resultado = service.buscarUsuario(1);

    expect(repositorio.buscarPorId).toHaveBeenCalled();
    expect(resultado).toEqual(usuario);
  });

  it('calls the repository with the requested user id', () => {
    const usuario = { id: 2, nome: 'João', email: 'joao@exemplo.com' };
    const repositorio = {
      buscarPorId: jest.fn().mockReturnValue(usuario),
    };
    const service = criarUsuarioService(repositorio);

    service.buscarUsuario(2);

    expect(repositorio.buscarPorId).toHaveBeenCalledWith(2);
  });

  it('returns null when the repository does not find a user', () => {
    const repositorio = {
      buscarPorId: jest.fn().mockReturnValue(null),
    };
    const service = criarUsuarioService(repositorio);

    const resultado = service.buscarUsuario(99);

    expect(resultado).toBeNull();
  });

  it('calls the repository exactly once for a user search', () => {
    const usuario = { id: 1, nome: 'Maria', email: 'maria@exemplo.com' };
    const repositorio = {
      buscarPorId: jest.fn().mockReturnValue(usuario),
    };
    const service = criarUsuarioService(repositorio);

    service.buscarUsuario(1);

    expect(repositorio.buscarPorId).toHaveBeenCalledTimes(1);
  });

  it('returns the user resolved by an asynchronous repository', async () => {
    const usuario = { id: 1, nome: 'Maria', email: 'maria@exemplo.com' };
    const repositorio = {
      buscarPorId: jest.fn().mockResolvedValue(usuario),
    };
    const service = criarUsuarioService(repositorio);

    const resultado = await service.buscarUsuario(1);

    expect(resultado).toEqual(usuario);
  });
});
