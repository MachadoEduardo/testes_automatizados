interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface Repositorio {
  buscarPorId(id: number): Usuario | null | Promise<Usuario | null>;
}

export function criarUsuarioService(repositorio: Repositorio) {
  return {
    buscarUsuario(id: number) {
      return repositorio.buscarPorId(id);
    },
  };
}
