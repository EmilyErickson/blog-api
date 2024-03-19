const Post = require("../models/posts");
const Comment = require("../models/comments");

const asyncHandler = require("express-async-handler");

exports.post_create_comment = asyncHandler(async (req, res, next) => {
  const comment = new Comment({
    authorEmail: req.body.email,
    content: req.body.content,
    timestamp: req.body.timestamp,
    post: req.body.postId,
  });
  try {
    const post = await Post.findById(req.body.postId);
    if (!post) {
      res.status(400).json({ message: "Post does not exist" });
    }
    const commentToSave = await comment.save();
    post.comments.push(commentToSave);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
exports.post_delete_comment = asyncHandler(async (req, res, next) => {
  try {
    const commentId = req.params.id;

    // Find the comment to be deleted
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Find the post associated with the comment
    const postId = comment.post;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Remove the comment from the post's comments array
    const index = post.comments.indexOf(commentId);
    if (index > -1) {
      post.comments.splice(index, 1);
    }

    // Save the updated post
    await post.save();

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: `Comment ${commentId} has been deleted.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
