import { Request, Response } from 'express';
import { UserService } from '../service/User';

export class UsersController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json({ response: true, message: "Success", data: users });
    } catch (err: any) {
      res.status(500).json({ response: false, message: err.message, data: null });
    }
  }

  // Add more methods as needed
}