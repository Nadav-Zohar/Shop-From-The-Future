import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import chalk from "chalk";
import multer from "multer";
import fs from "fs";
import { signUp } from "./src/routes/users/Signup.js";
import { login } from "./src/routes/users/Login.js";
import { addProduct } from "./src/routes/products/addProduct.js";
import { allProducts } from "./src/routes/products/allProducts.js";
import { myCart } from "./src/routes/carts/myCart.js";
import { createNewCart } from "./src/routes/carts/createNewCart.js";
import { addProductToCart } from "./src/routes/carts/addProductToCart.js";
import { removeProductFromCart } from "./src/routes/carts/deleteProductFromCart.js";
import { decreaseCartItemQuantity } from "./src/routes/carts/decreaseCartItemQuantity.js";
import { increaseCartItemQuantity } from "./src/routes/carts/increaseCartItemQuantity.js";
import { deleteCart } from "./src/routes/carts/deleteCart.js";
import { addOrder } from "./src/routes/orders/addOrder.js";
import { allUsers } from "./src/routes/users/allUsers.js";
import { deleteUser } from "./src/routes/users/deleteUser.js";
import { updateToAdmin } from "./src/routes/users/updateToAdmin.js";
import { allOrders } from "./src/routes/orders/allOrders.js";
import { updateToComplete } from "./src/routes/orders/updateToComplete.js";
import path from "path";
import { fileURLToPath } from "url";
import { deleteProduct } from "./src/routes/products/deleteProduct.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    allowedHeaders: "Content-Type, Accept, Authorization",
  })
);

app.use(morgan(":date[iso] :method :url :status :response-time ms"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(chalk.green("MongoDB Connected")))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.blue(`Server running on port ${PORT}`));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imageName = req.body.imageName;
    const dir = path.join(__dirname, "public", "images", imageName);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Use original name provided by client which already includes the sequential index
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("images"), (req, res) => {
  console.log("Files uploaded: ", req.files.length);
  res.send({
    message: "Files uploaded successfully!",
    count: req.files.length,
  });
});

signUp(app);
login(app);
allUsers(app);
deleteUser(app);
updateToAdmin(app);

addProduct(app);
allProducts(app);
deleteProduct(app);

createNewCart(app);
myCart(app);
addProductToCart(app);
removeProductFromCart(app);
decreaseCartItemQuantity(app);
increaseCartItemQuantity(app);
deleteCart(app);

updateToComplete(app);
addOrder(app);
allOrders(app);
