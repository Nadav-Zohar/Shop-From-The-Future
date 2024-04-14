import { authenticateUser } from "../../middlewares/auth.js";
import { Cart } from "../../models/cart/cart.schema.js";

export const deleteCart = (app) => {
  app.delete("/carts/:cartId", authenticateUser, async (req, res) => {
    try {
      const userToken = req.headers.authorization;
      if (!userToken) {
        return res.status(401).send("Unauthorized: you are not connected");
      }

      const result = await Cart.deleteOne({ _id: req.params.cartId });
      if (result.deletedCount == 0) {
        return res
          .status(404)
          .send("Not Found: cart not found or already deleted");
      }

      res.send("Cart successfully deleted");
    } catch (error) {
      console.error("Error Deleting Cart:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
