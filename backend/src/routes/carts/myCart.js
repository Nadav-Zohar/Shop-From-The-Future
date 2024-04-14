import { authenticateUser } from "../../middlewares/auth.js";
import { Cart } from "../../models/cart/cart.schema.js";
import { tokenDecoded } from "../../services/decodeToken.js";

export const myCart = (app) => {
  app.get("/carts/my-cart", authenticateUser, async (req, res) => {
    try {
      const userToken = req.headers.authorization;

      const decodedToken = tokenDecoded(userToken);

      if (!userToken) {
        return res.status(401).send("Unauthorized: you are not connected");
      }

      const cart = await Cart.find({ user_id: decodedToken._id });

      res.send(cart);
    } catch (error) {
      console.error("Error fetching user cart:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
