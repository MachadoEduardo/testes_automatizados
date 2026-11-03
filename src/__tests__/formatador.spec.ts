import { formatarNome } from '../formatador';

describe('formatarNome function', () => {
  it('capitalizes the first letter of a lowercase name', () => {
    const nome = 'maria';

    const resultado = formatarNome(nome);

    expect(resultado).toBe('Maria');
  });

  it('removes spaces from the beginning and end of a name', () => {
    const nome = ' joão ';

    const resultado = formatarNome(nome);

    expect(resultado).toBe('João');
  });

  it('converts the remaining letters of an uppercase name to lowercase', () => {
    const nome = 'ANA';

    const resultado = formatarNome(nome);

    expect(resultado).toBe('Ana');
  });

  it('returns an empty name without throwing an error', () => {
    const nome = '';

    const resultado = formatarNome(nome);

    expect(resultado).toBe('');
  });
});
