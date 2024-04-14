import { adminAuth } from "../../middlewares/adminAuth.js";
import { authenticateUser } from "../../middlewares/auth.js";
import { User } from "../../models/user/user.schema.js";

export const updateToAdmin = (app) => {
  app.patch("/users/:id", authenticateUser, adminAuth, async (req, res) => {
    try {
      const userToken = req.headers.authorization;

      if (!userToken) {
        return res.status(401).send("Unauthorized: you are not connected");
      }

      if (req.body.user == true) {
        return res
          .status(401)
          .send("Unauthorized: you cannot downgrade a admin");
      }

      const user = await User.findOne({ _id: req.params.id });

      if (!user) {
        return res.status(404).send("Not Found: user not found");
      }

      user.isAdmin = !user.isAdmin;

      await user.save();

      res.send(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
