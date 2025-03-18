import { UserEntity } from "../../entities";
import { CustomError } from "../../errors";
import { UserRepository } from "../../repositories";

interface GetUserUseCase {
  execute: (id: string) => Promise<UserEntity>;
}

export class GetUser implements GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw CustomError.badRequest("Usuario no encontrado");
    }

    return user;
  }
}
