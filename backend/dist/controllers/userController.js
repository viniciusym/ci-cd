var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import userService from '../services/userService.js';
const userController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { fullName, email } = req.body;
            const user = yield userService.createUser(fullName, email);
            return res.status(201).json(user);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }),
    getAll: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userService.getUsers();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    })
};
export default userController;
