import { randomUUID } from 'node:crypto';

export function criarUsuario(nome: string, idade: number) {
  return { id: randomUUID(), nome, idade };
}
