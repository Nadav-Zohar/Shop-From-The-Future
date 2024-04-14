import { Schema, Types } from "mongoose";

export const CartItem = Schema({
  product_Id: { type: Types.ObjectId },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
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
});
