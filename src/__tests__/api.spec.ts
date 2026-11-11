import request from 'supertest';
import app from '../app';

describe('Rotas iniciais da API', () => {
  it('deve retornar status 200 e corpo ok quando consultar GET /ping', async () => {
    const response = await request(app).get('/ping');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('deve retornar JSON quando consultar GET /ping', async () => {
    const response = await request(app).get('/ping');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('deve retornar status 404 quando consultar uma rota inexistente', async () => {
    const response = await request(app).get('/rota-inexistente');

    expect(response.status).toBe(404);
    expect(response.text).toContain('Cannot GET /rota-inexistente');
  });

  it('deve retornar status 404 quando enviar POST /ping', async () => {
    const response = await request(app).post('/ping');

    expect(response.status).toBe(404);
    expect(response.text).toContain('Cannot POST /ping');
  });
});

describe('GET /saudacao/:nome', () => {
  it('deve retornar a saudação quando receber o nome Maria', async () => {
    const nome = 'Maria';

    const response = await request(app).get(`/saudacao/${nome}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ mensagem: 'Olá, Maria' });
  });

  it('deve preservar o espaço quando receber o nome Ana Paula', async () => {
    const nome = encodeURIComponent('Ana Paula');

    const response = await request(app).get(`/saudacao/${nome}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ mensagem: 'Olá, Ana Paula' });
  });
});

describe('POST /soma', () => {
  it('deve retornar 5 quando somar 2 e 3', async () => {
    const dados = { a: 2, b: 3 };

    const response = await request(app).post('/soma').send(dados);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ resultado: 5 });
  });

  it('deve retornar -3 quando somar -5 e 2', async () => {
    const dados = { a: -5, b: 2 };

    const response = await request(app).post('/soma').send(dados);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ resultado: -3 });
  });

  it('deve retornar erro 400 quando o campo b estiver ausente', async () => {
    const dados = { a: 2 };

    const response = await request(app).post('/soma').send(dados);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ erro: 'Os campos a e b devem ser números.' });
  });

  it('deve retornar erro 400 quando o campo a não for um número', async () => {
    const dados = { a: 'x', b: 3 };

    const response = await request(app).post('/soma').send(dados);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ erro: 'Os campos a e b devem ser números.' });
  });

  it('deve retornar erro 400 quando o campo a estiver ausente', async () => {
    const dados = { b: 3 };

    const response = await request(app).post('/soma').send(dados);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ erro: 'Os campos a e b devem ser números.' });
  });

  it('deve retornar erro 400 quando o campo b não for um número', async () => {
    const dados = { a: 2, b: 'x' };

    const response = await request(app).post('/soma').send(dados);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ erro: 'Os campos a e b devem ser números.' });
  });

  it('deve retornar erro 400 quando o corpo da requisição estiver ausente', async () => {
    const response = await request(app).post('/soma');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ erro: 'Os campos a e b devem ser números.' });
  });
});
