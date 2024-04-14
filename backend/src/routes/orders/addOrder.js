import { orderValidation } from "../../helpers/orderJoiValidation/order.Validation.js";
import { Order } from "../../models/order/order.schema.js";
import { tokenDecoded } from "../../services/decodeToken.js";

export const addOrder = (app) => {
  app.post("/order", async (req, res) => {
    try {
      const orderForm = req.body;

      const validate = orderValidation.validate(orderForm, {
        abortEarly: false,
      });

      if (validate.error) {
        return res.status(400).send(`Unauthorized: ${validate.error}`);
      }

      const userToken = req.headers.authorization;

      if (
        userToken &&
        typeof userToken === "string" &&
        userToken.split(".").length === 3
      ) {
        try {
          const decodedToken = tokenDecoded(userToken);
          orderForm.user_Id = decodedToken._id;
        } catch (error) {
          console.error("Error decoding token:", error);
          return res.status(401).send("Invalid token.");
        }
      }

      const order = new Order(orderForm);
      const savedOrder = await order.save();

      res.send(savedOrder);
    } catch (error) {
      console.error("Error adding order:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
