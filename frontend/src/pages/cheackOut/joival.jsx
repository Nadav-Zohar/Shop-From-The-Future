/* eslint-disable no-useless-escape */
import Joi from "joi";

export const userInfoValidation = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name cannot be empty",
    "string.min": "First name must be at least 2 characters long",
    "string.max": "First name must be less than or equal to 50 characters long",
    "any.required": "First name is a required field",
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name cannot be empty",
    "string.min": "Last name must be at least 2 characters long",
    "string.max": "Last name must be less than or equal to 50 characters long",
    "any.required": "Last name is a required field",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is a required field",
    }),
  country: Joi.string().min(2).max(56).required().messages({
    "string.base": "Country name must be a string",
    "string.empty": "Country name cannot be empty",
    "string.min": "Country name must be at least 2 characters long",
    "string.max":
      "Country name must be less than or equal to 56 characters long",
    "any.required": "Country name is a required field",
  }),
  city: Joi.string().min(2).max(85).required().messages({
    "string.base": "City name must be a string",
    "string.empty": "City name cannot be empty",
    "string.min": "City name must be at least 2 characters long",
    "string.max": "City name must be less than or equal to 85 characters long",
    "any.required": "City name is a required field",
  }),
  street: Joi.string().min(2).max(100).required().messages({
    "string.base": "Street name must be a string",
    "string.empty": "Street name cannot be empty",
    "string.min": "Street name must be at least 2 characters long",
    "string.max":
      "Street name must be less than or equal to 100 characters long",
    "any.required": "Street name is a required field",
  }),
  houseNumber: Joi.string()
    .min(1)
    .max(10)
    .pattern(new RegExp("^[0-9a-zA-Z-]+$"))
    .required()
    .messages({
      "string.base": "House number must be a string",
      "string.empty": "House number cannot be empty",
      "string.min": "House number must be at least 1 character long",
      "string.max":
        "House number must be less than or equal to 10 characters long",
      "string.pattern.base":
        "House number can only contain letters, numbers, and dashes",
      "any.required": "House number is a required field",
    }),
});

export const creditInfoValidation = Joi.object({
  cardholderName: Joi.string().min(2).max(100).required(),
  cardNumber: Joi.string().min(4).max(16).required(),
  expire: Joi.string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)
    .required(),
  CVV: Joi.string()
    .regex(/^[0-9]{3,4}$/)
    .required(),
});

export const userInfoFields = [
  {
    colSpan: "sm:col-span-3",
    htmlFor: "firstname",
    content: "First name",
    id: "firstname",
    type: "text",
    name: "firstName",
    placeholder: "First name",
  },
  {
    colSpan: "sm:col-span-3",
    htmlFor: "lastname",
    content: "Last name",
    id: "lastname",
    type: "text",
    name: "lastName",
    placeholder: "Last name",
  },
  {
    colSpan: "sm:col-span-3",
    htmlFor: "email",
    content: "Email",
    id: "email",
    type: "email",
    name: "email",
    placeholder: "Email",
  },
  {
    colSpan: "",
    htmlFor: "country",
    content: "Country",
    id: "country",
    type: "text",
    name: "country",
    placeholder: "",
  },
  {
    colSpan: "sm:col-span-2",
    htmlFor: "city",
    content: "City",
    id: "city",
    type: "text",
    name: "city",
    placeholder: "",
  },
  {
    colSpan: "sm:col-span-2",
    htmlFor: "street",
    content: "Street",
    id: "street",
    type: "text",
    name: "street",
    placeholder: "",
  },
  {
    colSpan: "sm:col-span-2",
    htmlFor: "housenumber",
    content: "House Number",
    id: "housenumber",
    type: "number",
    name: "houseNumber",
    placeholder: "",
  },
];

export const creditInfoFields = [
  {
    colSpan: "",
    htmlFor: "cardholdername",
    content: "Cardholder Name",
    id: "cardholdername",
    type: "text",
    name: "cardholderName",
    placeholder: "Cardholder Name",
  },
  {
    colSpan: "",
    htmlFor: "cardnumber",
    content: "Card Number",
    id: "cardnumber",
    type: "number",
    name: "cardNumber",
    placeholder: "Card Number",
  },
  {
    colSpan: "sm:col-span-3",
    htmlFor: "expire",
    content: "Expire",
    id: "expire",
    type: "text",
    name: "expire",
    placeholder: "00/00",
  },
  {
    colSpan: "sm:col-span-3",
    htmlFor: "cvv",
    content: "CVV",
    id: "cvv",
    type: "number",
    name: "CVV",
    placeholder: "000",
  },
];
