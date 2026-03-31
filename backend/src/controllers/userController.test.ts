import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import userService from '../services/userService.js';
import app from '../server.js';

vi.mock('../../src/services/userService');

describe('UserController - POST /api/users', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deve retornar 201 e o utilizador criado com sucesso', async () => {
    const mockUser = { id: '1', fullName: 'mike', email: 'mike@teste.com' };

    vi.mocked(userService.createUser).mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/api/users')
      .send({ fullName: 'mike', email: 'mike@teste.com' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
    expect(userService.createUser).toHaveBeenCalledWith('mike', 'mike@teste.com');
  });

  it('Deve retornar 400 se o serviço lançar um erro (ex: email inválido)', async () => {
    vi.mocked(userService.createUser).mockRejectedValue(new Error('Email inválido'));

    const response = await request(app)
      .post('/api/users')
      .send({ fullName: 'mike', email: 'email-errado' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email inválido');
  });


  it('Deve retornar 200 e a lista de utilizadores', async () => {
    const mockUsers = [{ id: '1', fullName: 'mike', email: 'mike@teste.com' }];

    vi.mocked(userService.getUsers).mockResolvedValue(mockUsers);

    const response = await request(app)
      .get('/api/users')

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
    expect(userService.getUsers).toHaveBeenCalled();
  });

  it('Deve retornar 400 se o serviço lançar um erro', async () => {
    vi.mocked(userService.getUsers).mockRejectedValue(new Error('server error'));

    const response = await request(app)
      .get('/api/users')

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('server error');
  });
});
