import { UserDto } from "../../dtos";

import { UserEntity } from "../../entities";
import { CustomError } from "../../errors";
import { UserRepository } from "../../repositories";

interface CreateUserUseCase {
  execute: (user: UserDto) => Promise<UserEntity>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: UserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) {
      throw CustomError.badRequest("Correo electrónico ya registrado");
    }

    if (!Array.isArray(user.addresses)) {
      throw CustomError.badRequest("El campo direcciones debe ser un array");
    }

    for (const address of user.addresses) {
      if (!address.street || !address.city || !address.country) {
        throw CustomError.badRequest("Datos de dirección incompletos");
      }
    }

    return this.userRepository.create(user);
  }
}
