import { authenticateUser } from "../../middlewares/auth.js";
import { Cart } from "../../models/cart/cart.schema.js";

export const decreaseCartItemQuantity = (app) => {
  app.patch(
    "/carts/:cartId/decrease/:productId",
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

        if (cart.items[productIndex].quantity > 1) {
          cart.items[productIndex].quantity -= 1;
        }

        await cart.save();

        res.send(cart);
      } catch (error) {
        console.error("Error Decreasing Product Quantity:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  );
};
