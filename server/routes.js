const router = require("express").Router();
const session = require("express-session");

require("dotenv").config();
const { SESSION_SECRET } = process.env;

const {
  getUsers,
  getUserById,
  registerUser,
  authUser,
  updateUser,
  deleteUser,
} = require("./users_handlers");

const { authAdmin, registerAdmin } = require("./admin_handlers");

const {
  getOrders,
  getOrderById,
  placeOrder,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} = require("./orders_handlers");

const {
  getItems,
  getItemById,
  getItemsByCategory,
  addItem,
  updateItem,
  deleteItem,
} = require("./items_handlers");

const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("./categories_handlers");

router.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 5,
    },
  })
);

router.get("/api/users", getUsers);
router.get("/api/users/:userId", getUserById);
router.post("/api/users", registerUser);
router.post("/api/users/login", authUser);
router.put("/api/users", updateUser);
router.delete("/api/users", deleteUser);
router.post("/api/admin/setup", registerAdmin);
router.post("/api/admin", authAdmin);
router.get("/api/orders", getOrders);
router.get("/api/orders/:orderId", getOrderById);
router.get("/api/orders/user/:userId", getOrdersByUserId);
router.post("/api/orders", placeOrder);
router.put("/api/orders/:orderId", updateOrder);
router.delete("/api/orders/:orderId", deleteOrder);
router.get("/api/items", getItems);
router.get("/api/items/:itemId", getItemById);
router.get("/api/items/category/:category", getItemsByCategory);
router.post("/api/items", addItem);
router.put("/api/items/:itemId", updateItem);
router.delete("/api/items/:itemId", deleteItem);
router.get("/api/categories", getCategories);
router.post("/api/categories", addCategory);
router.put("/api/categories/:catId", updateCategory);
router.delete("/api/categories/:catId", deleteCategory);

module.exports = router;
