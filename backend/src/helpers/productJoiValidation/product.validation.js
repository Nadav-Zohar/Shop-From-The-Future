import Joi from "joi";

export const productValidation = Joi.object({
  name: Joi.string().required().min(2).max(256),

  description: Joi.string().required().min(2).max(1024),

  imageName: Joi.string().min(2).max(256).required(),

  imageCount: Joi.number().min(0).required(),

  price: Joi.number().min(0).required(),

  category: Joi.string().min(1).max(256).required(),

  stock: Joi.number().integer().min(0).required(),

  company: Joi.string().min(2).max(256).required(),
});
