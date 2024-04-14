import { Product } from "../../models/product/products.schema.js";

export const allProducts = (app) => {
  app.get("/products", async (req, res) => {
    try {
      const products = await Product.find();

      res.send(products);
    } catch (error) {
      console.error("Error fetching all products:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
