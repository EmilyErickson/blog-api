const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
