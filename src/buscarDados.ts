export async function buscarDados(): Promise<{ ok: boolean }> {
  return { ok: true };
}

export async function buscarDadosComErro(): Promise<never> {
  throw new Error('falha ao buscar dados');
}
