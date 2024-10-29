const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  data: { type: String, required: false },
  completed: { type: Boolean, default: false },
  isPrivate: { type: Boolean, default: true },
});

module.exports = mongoose.model("Todo", TodoSchema);
