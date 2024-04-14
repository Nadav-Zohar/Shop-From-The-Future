import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../models/user/user.schema.js";
import { loginValidation } from "../../helpers/userJoiValidation/login.validation.js";

export const login = (app) => {
  app.post("/users/login", async (req, res) => {
    const validate = loginValidation.validate(req.body, { abortEarly: false });

    if (validate.error) {
      return res.status(400).json({
        error: `Unauthorized: ${validate.error.details
          .map((detail) => detail.message)
          .join(", ")}`,
      });
    }

    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Required fields empty" });
      }

      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
          .status(403)
          .json({ message: "Email or password are incorrect" });
      }

      const token = JWT.sign(
        {
          _id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
