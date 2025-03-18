import { CustomError } from "../../errors";
import { UserRepository } from "../../repositories";

interface DeleteUserUseCase {
  execute: (id: string) => Promise<boolean>;
}

export class DeleteUser implements DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);

    if (!result) {
      throw CustomError.badRequest("Usuario no encontrado");
    }

    return result;
  }
}
