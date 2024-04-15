import { adminAuth } from "../../middlewares/adminAuth.js";
import { authenticateUser } from "../../middlewares/auth.js";
import { Product } from "../../models/product/products.schema.js";

export const deleteProduct = (app) => {
  app.delete("/products/:id", authenticateUser, adminAuth, async (req, res) => {
    try {
      const userToken = req.headers.authorization;

      if (!userToken) {
        return res.status(401).send("Unauthorized: you are not connected");
      }

      const deleteProduct = await Product.findByIdAndDelete(req.params.id);

      if (!deleteProduct) {
        return res.status(404).send("Not Found: product not found");
      }

      res.send("Product deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
