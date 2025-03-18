import { UserDto } from "../dtos/user.dto";

import { UserEntity } from "../entities";

export abstract class UserRepository {
  abstract create(user: UserDto): Promise<UserEntity>;
  abstract findAll(page: number, limit: number): Promise<UserEntity[]>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract update(id: string, user: Partial<UserDto>): Promise<UserEntity | null>;
  abstract delete(id: string): Promise<boolean>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findByCity(city: string, page?: number, limit?: number): Promise<UserEntity[]>;
}
