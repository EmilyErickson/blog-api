const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  authorEmail: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
