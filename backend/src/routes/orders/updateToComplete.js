import { adminAuth } from "../../middlewares/adminAuth.js";
import { authenticateUser } from "../../middlewares/auth.js";
import { Order } from "../../models/order/order.schema.js";

export const updateToComplete = (app) => {
  app.patch("/orders/:id", authenticateUser, adminAuth, async (req, res) => {
    try {
      const userToken = req.headers.authorization;

      if (!userToken) {
        return res.status(401).send("Unauthorized: you are not connected");
      }

      const order = await Order.findOne({ _id: req.params.id });

      if (!order) {
        return res.status(404).send("Not Found: order not found");
      }

      order.orderStatus == "Pending"
        ? (order.orderStatus = "Complete")
        : order.orderStatus == "Complete"
        ? (order.orderStatus = "Pending")
        : "";

      await order.save();

      res.send(order);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).send("Internal Server Error");
    }
  });
};
