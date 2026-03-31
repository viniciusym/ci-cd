var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import supabase from "../supabase.js";
const userService = {
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.from('users').select();
            if (error)
                throw new Error(error.message);
            return data;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }),
    createUser: (fullName, email) => __awaiter(void 0, void 0, void 0, function* () {
        if (!email.includes('@')) {
            throw new Error('Email inválido');
        }
        try {
            const { data, error } = yield supabase
                .from('users')
                .insert([{ full_name: fullName, email }])
                .select()
                .single();
            if (error)
                throw new Error(error.message);
            return data;
        }
        catch (error) {
            console.error(error);
            return error;
        }
    })
};
export default userService;
