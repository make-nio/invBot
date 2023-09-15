import request from 'supertest';
import app from '../src/server';

describe('Auth routes', () => {
  it('should redirect to /dashboard on successful login', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'correctUsername', password: 'correctPassword' });
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/dashboard');
  });

  // ... otras pruebas para las rutas de autenticación ...
});
