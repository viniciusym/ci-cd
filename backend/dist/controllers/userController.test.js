var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import userService from '../services/userService.js';
import app from '../server.js';
vi.mock('../../src/services/userService');
describe('UserController - POST /api/users', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('Deve retornar 201 e o utilizador criado com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: '1', fullName: 'mike', email: 'mike@teste.com' };
        vi.mocked(userService.createUser).mockResolvedValue(mockUser);
        const response = yield request(app)
            .post('/api/users')
            .send({ fullName: 'mike', email: 'mike@teste.com' });
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockUser);
        expect(userService.createUser).toHaveBeenCalledWith('mike', 'mike@teste.com');
    }));
    it('Deve retornar 400 se o serviço lançar um erro (ex: email inválido)', () => __awaiter(void 0, void 0, void 0, function* () {
        vi.mocked(userService.createUser).mockRejectedValue(new Error('Email inválido'));
        const response = yield request(app)
            .post('/api/users')
            .send({ fullName: 'mike', email: 'email-errado' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email inválido');
    }));
    it('Deve retornar 200 e a lista de utilizadores', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [{ id: '1', fullName: 'mike', email: 'mike@teste.com' }];
        vi.mocked(userService.getUsers).mockResolvedValue(mockUsers);
        const response = yield request(app)
            .get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUsers);
        expect(userService.getUsers).toHaveBeenCalled();
    }));
    it('Deve retornar 400 se o serviço lançar um erro', () => __awaiter(void 0, void 0, void 0, function* () {
        vi.mocked(userService.getUsers).mockRejectedValue(new Error('server error'));
        const response = yield request(app)
            .get('/api/users');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('server error');
    }));
});
