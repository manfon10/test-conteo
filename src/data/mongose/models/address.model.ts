import { Schema } from "mongoose";

export const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  zip_code: { type: String },
});

AddressSchema.set("toObject", {
  transform: (_doc, ret) => {
    ret.id = ret._id;

    delete ret._id;

    delete ret.__v;

    return ret;
  },
});
