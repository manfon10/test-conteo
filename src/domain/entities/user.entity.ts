import { AddressEntity } from "./address.entity";

export class UserEntity {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public age: string,
    public addresses: AddressEntity[]
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, email, name, age, addresses } = object;

    return new UserEntity(id, email, name, age, addresses);
  }
}
