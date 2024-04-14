import { Schema, Types } from "mongoose";

export const OrderItem = Schema({
  product_Id: { type: Types.ObjectId, required: true },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  total: { type: String, required: true },
});
