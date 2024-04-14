/* eslint-disable no-useless-escape */
import Joi from "joi";
export const fields = [
  {
    htmlFor_and_Id: "first-name-input",
    content: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    name: "firstName",
  },
  {
    htmlFor_and_Id: "last-name-input",
    content: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    name: "lastName",
  },
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
  {
    htmlFor_and_Id: "rt-password-input",
    content: "Re-type Password",
    type: "password",
    placeholder: "Re-type your password",
    name: "re_type_password",
  },
];

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

export const signUpValidation = Joi.object({
  firstName: Joi.string().min(2).max(256).required(),
  lastName: Joi.string().min(2).max(256).required(),
  email: Joi.string()
    .ruleset.pattern(
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    )
    .rule({ message: 'user "mail" must be a valid mail' })
    .required(),
  password: Joi.string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*'-])(?=.*\d).{6,}$/)
    .rule({
      message:
        'user "password" must be at least six characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters: !@#$%^&*-\'.',
    })
    .required(),
  re_type_password: Joi.string().required(),
  isAdmin: Joi.boolean().allow(""),
});
