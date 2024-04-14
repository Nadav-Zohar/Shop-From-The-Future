import { adminAuth } from "../../middlewares/adminAuth.js";
import { authenticateUser } from "../../middlewares/auth.js";
import { User } from "../../models/user/user.schema.js";

export const deleteUser = (app) => {
  app.delete("/users/:id", authenticateUser, adminAuth, async (req, res) => {
    try {
      const userToken = req.headers.authorization;

      if (!userToken) {
        return res.status(401).send("Unauthorized: you are not connected");
      }

      if (req.body.user == true) {
        return res.status(401).send("Unauthorized: you cannot delete admins");
      }

      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser) {
        return res.status(404).send("Not Found: user not found");
      }

      res.send("User deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
