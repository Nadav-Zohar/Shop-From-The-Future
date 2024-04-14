import Joi from "joi";

export const fieldsForProductAdd = [
  { htmlForAndId: "name", content: "Name", type: "text" },
  { htmlForAndId: "price", content: "Price", type: "number" },
  { htmlForAndId: "companyName", content: "Company Name", type: "text" },
  { htmlForAndId: "stock", content: "Stock", type: "number" },
  { htmlForAndId: "category", content: "Category", type: "text" },
  { htmlForAndId: "description", content: "Description", type: "textarea" },
];

export const addProductValidation = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": `"Name" should be a type of 'text'`,
    "string.empty": `"Name" cannot be an empty field`,
    "string.min": `"Name" should have a minimum length of {#limit}`,
    "string.max": `"Name" should have a maximum length of {#limit}`,
    "any.required": `"Name" is a required field`,
  }),
  price: Joi.number().positive().precision(2).required().messages({
    "number.base": `"Price" should be a type of 'number'`,
    "number.positive": `"Price" must be a positive number`,
    "number.precision": `"Price" must have at most 2 decimal places`,
    "any.required": `"Price" is a required field`,
  }),
  companyName: Joi.string().min(2).max(50).required().messages({
    "string.min": `"Company Name" should have a minimum length of {#limit}`,
    "string.max": `"Company Name" should have a maximum length of {#limit}`,
    "any.required": `"Company Name" is a required field`,
  }),
  stock: Joi.number().integer().min(0).required().messages({
    "number.base": `"Stock" should be a type of 'number'`,
    "number.integer": `"Stock" must be an integer`,
    "number.min": `"Stock" cannot be less than {#limit}`,
    "any.required": `"Stock" is a required field`,
  }),
  category: Joi.string().min(3).max(20).required().messages({
    "string.min": `"Category" should have a minimum length of {#limit}`,
    "string.max": `"Category" should have a maximum length of {#limit}`,
    "any.required": `"Category" is a required field`,
  }),
  description: Joi.string().max(500).allow("").optional().messages({
    "string.max": `"Description" should have a maximum length of {#limit}`,
  }),
});
