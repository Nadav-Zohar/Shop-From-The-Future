import { authenticateUser } from "../../middlewares/auth.js";
import { Cart } from "../../models/cart/cart.schema.js";
import { tokenDecoded } from "../../services/decodeToken.js";

export const createNewCart = (app) => {
  app.post("/carts", authenticateUser, async (req, res) => {
    try {
      const cartForm = req.body;

      const userToken = req.headers.authorization;

      const decodedToken = tokenDecoded(userToken);

      if (!userToken) {
        return res.status(401).send("Unauthorized: you are not connected");
      }

      cartForm.user_id = decodedToken._id;

      const cart = new Cart(cartForm);

      const obj = await cart.save();

      res.send(obj);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
