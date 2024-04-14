import { adminAuth } from "../../middlewares/adminAuth.js";
import { authenticateUser } from "../../middlewares/auth.js";
import { Order } from "../../models/order/order.schema.js";

export const allOrders = (app) => {
  app.get("/orders", authenticateUser, adminAuth, async (req, res) => {
    const userToken = req.headers.authorization;

    try {
      if (!userToken) {
        return res.status(401).send("Unauthorized: you are not connected");
      }

      const orders = await Order.find();

      res.send(orders);
    } catch (error) {
      console.error("Error fetching all orders:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
