import mongoose, { Schema, Document } from "mongoose";

import { AddressSchema } from "./address.model";

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  created_at: { type: Date, default: Date.now },
  addresses: { type: [AddressSchema], default: [] },
});

UserSchema.set("toObject", {
  transform: (_doc, ret) => {
    ret.id = ret._id;

    delete ret._id;

    delete ret.__v;

    return ret;
  },
});

export interface UserDocument extends Document {
  name: string;
  email: string;
  age?: number;
  created_at: Date;
  addresses: {
    street: string;
    city: string;
    country: string;
    zip_code?: string;
  }[];
}

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
