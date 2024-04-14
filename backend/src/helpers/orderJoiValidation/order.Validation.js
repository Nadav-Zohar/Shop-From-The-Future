import Joi from "joi";

const shippingDetailsSchema = Joi.object({
  firstName: Joi.string().min(2).max(256).required(),
  lastName: Joi.string().min(2).max(256).required(),
  email: Joi.string().email().required(),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().required(),
});

const paymentDetailsSchema = Joi.object({
  cardholderName: Joi.string().required(),
  cardNumber: Joi.string().required(),
  expire: Joi.string()
    .pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)
    .required(),
  CVV: Joi.string()
    .length(3)
    .pattern(/^[0-9]+$/)
    .required(),
});

const itemSchema = Joi.object({
  product_Id: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().integer().min(0).required(),
  total: Joi.number().min(0).required(),
});

export const orderValidation = Joi.object({
  shippingDetails: shippingDetailsSchema,
  paymentDetails: paymentDetailsSchema,
  items: Joi.array().items(itemSchema).required(),
  total: Joi.number().min(0).required(),
  trackingNumber: Joi.number().required(),
});
