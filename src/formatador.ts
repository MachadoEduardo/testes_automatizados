export function formatarNome(nome: string): string {
  const nomeFormatado = nome.trim().toLowerCase();

  if (nomeFormatado === '') {
    return '';
  }

  return nomeFormatado[0].toUpperCase() + nomeFormatado.slice(1);
}
