import request from 'supertest';
import app from '../app';

describe('API routes', () => {
  it('returns status 200 and an ok body for GET /ping', async () => {
    const response = await request(app).get('/ping');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('returns JSON content for GET /ping', async () => {
    const response = await request(app).get('/ping');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('returns status 404 for a route that does not exist', async () => {
    const response = await request(app).get('/rota-inexistente');

    expect(response.status).toBe(404);
    expect(response.text).toContain('Cannot GET /rota-inexistente');
  });

  it('returns status 404 for POST /ping', async () => {
    const response = await request(app).post('/ping');

    expect(response.status).toBe(404);
    expect(response.text).toContain('Cannot POST /ping');
  });
});
