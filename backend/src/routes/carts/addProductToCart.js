import { authenticateUser } from "../../middlewares/auth.js";
import { Cart } from "../../models/cart/cart.schema.js";

export const addProductToCart = (app) => {
  app.patch("/carts/:id", authenticateUser, async (req, res) => {
    try {
      const userToken = req.headers.authorization;

      if (!userToken) {
        return res.status(401).send("Unauthorized: you are not connected");
      }

      const cart = await Cart.findOne({ _id: req.params.id });

      if (!cart) {
        return res.status(404).send("Not Found: cart not found");
      }

      const newProduct = req.body;

      cart.items.push(newProduct);

      await cart.save();

      res.send(cart);
    } catch (error) {
      console.error("Error Adding Product:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
