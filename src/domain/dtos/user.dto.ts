import Joi from "joi";

export interface UserDto {
  name: string;
  email: string;
  age?: number;
  addresses: AddressDto[];
}

export interface AddressDto {
  street: string;
  city: string;
  country: string;
  zip_code: string;
}

export const filterUserIdSchema = Joi.object({
  id: Joi.string().required(),
});

export const filterSearchUserSchema = Joi.object({
  city: Joi.string().required(),
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
});

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).max(120).optional(),
  addresses: Joi.array().items(
    Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
      zip_code: Joi.string().required(),
    })
  ),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  age: Joi.number().integer().min(0).max(120).optional(),
  addresses: Joi.array().items(
    Joi.object({
      street: Joi.string().optional(),
      city: Joi.string().optional(),
      country: Joi.string().optional(),
      zip_code: Joi.string().optional(),
    })
  ),
});
