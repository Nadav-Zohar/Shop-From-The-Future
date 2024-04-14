import { Schema, model } from "mongoose";

const schema = Schema({
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
    default: "000",
    require: true,
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
    default: "000",
    require: true,
  },
  email: {
    type: String,
    required: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: { type: String, required: true, trim: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const User = model("users", schema);
