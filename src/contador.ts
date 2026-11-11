let valor = 0;

export function incrementar(): number {
  valor = valor + 1;
  return valor;
}

export function obterValor(): number {
  return valor;
}

export function reiniciar(): void {
  valor = 0;
}
