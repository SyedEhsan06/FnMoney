const jwt = require("jsonwebtoken");
const Todo = require("../models/todoModel");

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Create a new todo
const createTodo = async (req, res) => {
  const { data } = req.body;

  try {
    const todo = new Todo({
      data,
      userId: req.user.id,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { data, completed } = req.body;

  const todo = await Todo.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { data, completed },
    { new: true }
  );

  if (!todo) return res.status(403).json({ message: "Access denied" });
  res.json(todo);
};

// Delete a single todo
const deleteTodos = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });
  if (!todo) return res.status(403).json({ message: "Access denied" });
  res.json(todo);
};

// Read todos with search options
const readTodos = async (req, res) => {
  const { search } = req.query;
  const filter = { userId: req.user.id };

  if (search) {
    filter.data = { $regex: search, $options: 'i' };
  }

  try {
    const todos = await Todo.find(filter);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  authenticateToken,
  createTodo,
  updateTodo,
  deleteTodos,
  readTodos,
};
