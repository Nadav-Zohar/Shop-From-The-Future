import Joi from "joi";

export const loginValidation = Joi.object({
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
});
