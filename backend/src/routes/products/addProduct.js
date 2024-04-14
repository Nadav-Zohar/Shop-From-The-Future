import { productValidation } from "../../helpers/productJoiValidation/product.validation.js";
import { adminAuth } from "../../middlewares/adminAuth.js";
import { authenticateUser } from "../../middlewares/auth.js";
import { Product } from "../../models/product/products.schema.js";
import { tokenDecoded } from "../../services/decodeToken.js";

export const addProduct = (app) => {
  app.post("/products", authenticateUser, adminAuth, async (req, res) => {
    try {
      const productForm = req.body;

      const validate = productValidation.validate(productForm, {
        abortEarly: false,
      });

      if (validate.error) {
        return res.status(400).send(`Unauthorized: ${validate.error}`);
      }

      const userToken = req.headers.authorization;

      const decodedToken = tokenDecoded(userToken);

      if (!userToken) {
        return res.status(401).send("Unauthorized: you are not connected");
      }

      productForm.user_id = decodedToken._id;

      const product = new Product(productForm);

      const obj = await product.save();

      res.send(obj);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
