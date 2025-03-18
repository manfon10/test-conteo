import { UserDataSource } from "../domain/datasources";
import { UserDto } from "../domain/dtos";
import { UserEntity } from "../domain/entities";
import { UserRepository } from "../domain/repositories";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDataSource) {}

  async create(user: UserDto): Promise<UserEntity> {
    return await this.datasource.create(user);
  }

  async findAll(page: number, limit: number): Promise<UserEntity[]> {
    return await this.datasource.findAll(page, limit);
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.datasource.findById(id);
  }

  async update(id: string, user: Partial<UserDto>): Promise<UserEntity | null> {
    return await this.datasource.update(id, user);
  }

  async delete(id: string): Promise<boolean> {
    return await this.datasource.delete(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.datasource.findByEmail(email);
  }

  async findByCity(city: string, page?: number, limit?: number): Promise<UserEntity[]> {
    return await this.datasource.findByCity(city, page, limit);
  }
}
