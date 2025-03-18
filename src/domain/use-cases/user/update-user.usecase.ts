import { UserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { CustomError } from "../../errors";
import { UserRepository } from "../../repositories";

interface UpdateUserUseCase {
  execute: (id: string, user: Partial<UserDto>) => Promise<UserEntity>;
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, user: Partial<UserDto>): Promise<UserEntity> {
    if (user.email) {
      const existingUser = await this.userRepository.findByEmail(user.email);

      if (existingUser && existingUser.id !== id) {
        throw CustomError.badRequest("Email ya registrado por otro usuario");
      }
    }

    if (user.addresses) {
      if (!Array.isArray(user.addresses)) {
        throw CustomError.badRequest("El campo direcciones debe ser un array");
      }

      for (const address of user.addresses) {
        if (!address.street || !address.city || !address.country) {
          throw CustomError.badRequest("Datos de dirección incompletos");
        }
      }
    }

    const updatedUser = await this.userRepository.update(id, user);

    if (!updatedUser) {
      throw CustomError.badRequest("Usuario no encontrado");
    }

    return updatedUser;
  }
}
