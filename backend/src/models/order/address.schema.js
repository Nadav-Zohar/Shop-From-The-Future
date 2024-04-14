import { Schema } from "mongoose";

export const Address = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
  },
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  houseNumber: { type: String, required: true },
});
