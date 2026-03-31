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
import userService from '../services/userService.js';
import supabase from '../supabase.js';
vi.mock('../supabase.ts', () => ({
    default: {
        from: vi.fn(),
    },
}));
const mockChain = (overrides = {}) => {
    const chain = Object.assign({ select: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(), update: vi.fn().mockReturnThis(), delete: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), single: vi.fn().mockReturnThis() }, overrides);
    vi.mocked(supabase.from).mockReturnValue(chain);
    return chain;
};
describe('UserService - get', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('Deve retornar a lista de utilizadores', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [{ id: '1', fullName: 'mike', email: 'mike@teste.com' }];
        mockChain({
            select: vi.fn().mockResolvedValue({ data: mockUsers, error: null }),
        });
        const response = yield userService.getUsers();
        expect(supabase.from).toHaveBeenCalledWith('users');
        expect(response).toEqual(mockUsers);
    }));
    it('Caso o supabase retorna um erro, deve retornar o erro', () => __awaiter(void 0, void 0, void 0, function* () {
        const responseData = { data: null, error: { message: "error" } };
        const error = new Error(responseData.error.message);
        mockChain({
            select: vi.fn().mockResolvedValue(responseData)
        });
        const response = yield userService.getUsers();
        expect(supabase.from).toHaveBeenCalledWith('users');
        expect(response).toEqual(error);
    }));
});
describe('UserService - createUser', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('Deve criar um utilizador com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: '1', full_name: 'Mike', email: 'mike@teste.com' };
        mockChain({
            single: vi.fn().mockResolvedValue({ data: mockUser, error: null }),
        });
        const result = yield userService.createUser('Mike', 'mike@teste.com');
        expect(supabase.from).toHaveBeenCalledWith('users');
        expect(result).toEqual(mockUser);
    }));
    it('Deve lançar erro para email inválido', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(userService.createUser('Mike', 'invalid-email'))
            .rejects.toThrow('Email inválido');
        expect(supabase.from).not.toHaveBeenCalled();
    }));
    it('Deve retornar o erro quando o Supabase falhar na inserção', () => __awaiter(void 0, void 0, void 0, function* () {
        const apiError = { message: 'Database error' };
        mockChain({
            single: vi.fn().mockResolvedValue({ data: null, error: apiError }),
        });
        const result = yield userService.createUser('Mike', 'mike@teste.com');
        expect(result).toBeInstanceOf(Error);
        expect(result.message).toBe('Database error');
    }));
});
