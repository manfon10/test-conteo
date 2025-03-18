import { UserModel } from "../data/mongose/models/user.model";

import { UserDataSource } from "../domain/datasources";
import { UserDto } from "../domain/dtos";
import { UserEntity } from "../domain/entities";

export class UserDataSourceImpl implements UserDataSource {
  async update(id: string, user: Partial<UserDto>): Promise<UserEntity | null> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: user }, { new: true });

      return updatedUser ? UserEntity.fromObject(updatedUser.toObject()) : null;
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await UserModel.findByIdAndDelete(id);

      return !!result;
    } catch (error) {
      return false;
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email });

    return user ? UserEntity.fromObject(user.toObject()) : null;
  }

  async findByCity(city: string, page: number, limit: number): Promise<UserEntity[]> {
    const skip = (page - 1) * limit;

    const query = { "addresses.city": city };

    const users = await UserModel.find(query).skip(skip).limit(limit);

    return users.map((user) => UserEntity.fromObject(user.toObject()));
  }

  async create(user: UserDto): Promise<UserEntity> {
    const userDoc = new UserModel(user);

    const savedUser = await userDoc.save();

    return UserEntity.fromObject(savedUser.toObject());
  }

  async findAll(page: number, limit: number): Promise<UserEntity[]> {
    const skip = (page - 1) * limit;

    const users = await UserModel.find().skip(skip).limit(limit);

    return users.map((user) => UserEntity.fromObject(user.toObject()));
  }

  async findById(id: string): Promise<UserEntity | null> {
    try {
      const user = await UserModel.findById(id);

      return user ? UserEntity.fromObject(user.toObject()) : null;
    } catch (error) {
      return null;
    }
  }
}
