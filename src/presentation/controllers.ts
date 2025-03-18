import { NextFunction, Request, Response } from "express";

import { UserRepository } from "../domain/repositories";

import {
  CreateUser,
  DeleteUser,
  GetUser,
  GetUsers,
  GetUsersByCity,
  UpdateUser,
} from "../domain/use-cases";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { addresses, email, name, age } = req.body;

    new CreateUser(this.userRepository)
      .execute({ addresses, email, name, age })
      .then((user) => res.status(201).json(user))
      .catch(next);
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    new DeleteUser(this.userRepository)
      .execute(id)
      .then(() => res.status(204).json({ message: "Usuario eliminado" }))
      .catch(next);
  }

  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    new GetUsers(this.userRepository)
      .execute(page, limit)
      .then((data) => res.status(200).json(data))
      .catch(next);
  }

  async findByCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { city, page = 1, limit = 10 } = req.query;

    new GetUsersByCity(this.userRepository)
      .execute(city as string, parseInt(page as string), parseInt(limit as string))
      .then((data) => res.status(200).json(data))
      .catch(next);
  }

  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    new GetUser(this.userRepository)
      .execute(id)
      .then((user) => res.status(200).json(user))
      .catch(next);
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    const { addresses, email, name, age } = req.body;

    new UpdateUser(this.userRepository)
      .execute(id, { addresses, email, name, age })
      .then((user) => res.status(201).json(user))
      .catch(next);
  }
}
