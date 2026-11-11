interface UsuarioEmail {
  nome: string;
  email: string;
}

type ApiEnviar = (email: string, assunto: string) => boolean | Promise<boolean>;

export function criarEnviarEmail(apiEnviar: ApiEnviar) {
  return function enviarEmail(usuario: UsuarioEmail) {
    return apiEnviar(usuario.email, 'Bem-vindo!');
  };
}
