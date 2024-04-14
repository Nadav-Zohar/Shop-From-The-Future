import { Schema } from "mongoose";

export const Payment = new Schema({
  cardholderName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expire: { type: String, required: true },
  CVV: { type: String, required: true },
});
