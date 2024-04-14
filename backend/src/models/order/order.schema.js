import { Schema, Types, model } from "mongoose";
import { OrderItem } from "./item.schema.js";
import { Address } from "./address.schema.js";
import { Payment } from "./payment.schema.js";

const schema = Schema({
  user_Id: { type: Types.ObjectId },
  orderStatus: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  shippingDetails: Address,
  paymentDetails: Payment,
  items: [OrderItem],
  total: { type: Number, required: true },
  trackingNumber: { type: String },
});

export const Order = model("orders", schema);
