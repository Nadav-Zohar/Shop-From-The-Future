import { authenticateUser } from "../../middlewares/auth.js";
import { Cart } from "../../models/cart/cart.schema.js";

export const increaseCartItemQuantity = (app) => {
  app.patch(
    "/carts/:cartId/increase/:productId",
    authenticateUser,
    async (req, res) => {
      try {
        const userToken = req.headers.authorization;

        if (!userToken) {
          return res.status(401).send("Unauthorized: you are not connected");
        }

        const cart = await Cart.findOne({ _id: req.params.cartId });

        if (!cart) {
          return res.status(404).send("Not Found: cart not found");
        }

        const productIndex = cart.items.findIndex(
          (item) => item.product_Id == req.params.productId
        );

        if (productIndex == -1) {
          return res.status(404).send("Not Found: product not found in cart");
        }

        cart.items[productIndex].quantity += 1;

        await cart.save();

        res.send(cart);
      } catch (error) {
        console.error("Error Increasing Product Quantity:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  );
};
