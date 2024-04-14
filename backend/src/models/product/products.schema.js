import { Schema, Types, model } from "mongoose";

const schema = Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 1024,
    trim: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  company: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
  },
  imageName: {
    type: String,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
    default: "000",
    require: true,
  },
  imageCount: {
    type: Number,
    required: true,
  },
  user_id: { type: Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
});

export const Product = model("products", schema);
