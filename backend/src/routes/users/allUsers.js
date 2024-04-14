import { adminAuth } from "../../middlewares/adminAuth.js";
import { authenticateUser } from "../../middlewares/auth.js";
import { User } from "../../models/user/user.schema.js";

export const allUsers = (app) => {
  app.get("/users", authenticateUser, adminAuth, async (req, res) => {
    const userToken = req.headers.authorization;

    try {
      if (!userToken) {
        return res.status(401).send("Unauthorized: you are not connected");
      }

      const users = await User.find();

      res.send(users);
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
