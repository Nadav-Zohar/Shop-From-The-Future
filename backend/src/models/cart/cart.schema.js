import { Schema, Types, model } from "mongoose";
import { CartItem } from "./cartItem.schema.js";

const schema = Schema({
  user_id: { type: Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
  items: [CartItem],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Cart = model("carts", schema);
