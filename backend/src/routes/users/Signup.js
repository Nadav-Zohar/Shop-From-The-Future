import { signUpValidation } from "../../helpers/userJoiValidation/Signup.validation.js";
import { User } from "../../models/user/user.schema.js";
import bcrypt from "bcryptjs";

export const signUp = (app) => {
  app.post("/users", async (req, res) => {
    const userForm = req.body;

    const validate = signUpValidation.validate(userForm, { abortEarly: false });

    if (validate.error) {
      return res.status(400).send(`Unauthorized: ${validate.error}`);
    }

    const { password, re_type_password } = userForm;

    if (password != re_type_password) {
      return res.status(400).send(`passwords dont match`);
    }

    try {
      const newUser = await User({
        ...userForm,
        password: await bcrypt.hash(password, 10),
      });

      const obj = await newUser.save();

      res.send(obj);
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return res
          .status(409)
          .send("email already in use. please choose a different email.");
      } else {
        console.error("Error during user registration:", error);
        return res.status(500).send("Internal Server Error");
      }
    }
  });
};
