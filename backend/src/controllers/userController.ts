import { Request, Response } from 'express';
import userService from '../services/userService.ts';

const userController = {
  create: async (req: Request, res: Response) => {
    try {
      const { fullName, email } = req.body;
      const user = await userService.createUser(fullName, email);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      const users = await userService.getUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default userController;
