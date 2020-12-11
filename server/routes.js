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
  logoutUser,
} = require("./users_handlers");

const {
  getOrders,
  getOrderById,
  placeOrder,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
  getArchivedOrders,
} = require("./orders_handlers");

const {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
  addReviewToItem,
} = require("./items_handlers");

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
router.post("/api/users/logout", logoutUser);
router.put("/api/users/:userId", updateUser);
router.delete("/api/users/:userId", deleteUser);
router.get("/api/orders", getOrders);
router.get("/api/orders/archived", getArchivedOrders);
router.get("/api/orders/:orderId", getOrderById);
router.get("/api/orders/user/:userId", getOrdersByUserId);
router.post("/api/orders", placeOrder);
router.put("/api/orders/:orderId", updateOrder);
router.delete("/api/orders/:orderId", deleteOrder);
router.get("/api/items", getItems);
router.get("/api/items/:itemId", getItemById);
router.post("/api/items", addItem);
router.patch("/api/items/:itemId/review", addReviewToItem);
router.patch("/api/items/:itemId", updateItem);
router.delete("/api/items/:itemId", deleteItem);

module.exports = router;
