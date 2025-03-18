export class AddressEntity {
  constructor(
    public id: string,
    public street: string,
    public city: string,
    public zip_code: string,
    public country: string
  ) {}

  static fromObject(object: { [key: string]: any }): AddressEntity {
    const { id, street, city, zip_code, country } = object;

    return new AddressEntity(id, street, city, zip_code, country);
  }
}
