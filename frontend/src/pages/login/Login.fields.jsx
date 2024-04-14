/* eslint-disable no-useless-escape */
import Joi from "joi";
export const fields = [
  {
    htmlFor_and_Id: "email-input",
    content: "Email",
    type: "email",
    placeholder: "Enter your email",
    name: "email",
  },
  {
    htmlFor_and_Id: "password-input",
    content: "Password",
    type: "password",
    placeholder: "Enter your password",
    name: "password",
  },
];

export const loginValidation = Joi.object({
  email: Joi.string()
    .ruleset.pattern(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    )
    .rule({ message: 'user "mail" must be a valid mail' })
    .required(),

  password: Joi.string().required(),
});

export const primaryVariants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};
