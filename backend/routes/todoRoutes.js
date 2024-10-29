const express = require("express");
const { authenticateToken, createTodo, updateTodo, deleteTodos, readTodos } = require("../controllers/todoControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createTodo);
router.put("/update/:id", authMiddleware, updateTodo);
router.delete("/delete/:id", authMiddleware, deleteTodos);
router.get("/read", authMiddleware, readTodos);

module.exports = router;
