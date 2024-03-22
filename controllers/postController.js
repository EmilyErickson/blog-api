const User = require("../models/users");
const Post = require("../models/posts");
const Comment = require("../models/comments");

const asyncHandler = require("express-async-handler");

//Get all posts "/api/post/all"
exports.get_all_posts = asyncHandler(async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser;
    if (typeof currentUser === "undefined" || !currentUser) {
      const publishedPosts = await Post.find({ published: true });
      res.json(publishedPosts);
    } else {
      console.log("user", currentUser);
      const posts = await Post.find();

      res.json(posts);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get single post "/api/post/:id"
exports.get_single_post = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    const currentUser = req.session.currentUser;
    if (typeof currentUser === "undefined" || !currentUser) {
      if (post.published !== true) {
        res
          .status(404)
          .json({ message: "Please log in to see unpublished posts" });
      } else {
        res.json(post);
      }
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get single post comments "/api/post/:id/comments"
exports.get_post_comments = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.published !== true) {
      res.status(404).json({ message: "Couldn't find that post" });
    } else {
      res.json(post.comments);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new post POST method "/api/post/create"
exports.post_create_post = asyncHandler(async (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (typeof currentUser === "undefined" || !currentUser) {
    res.status(401).json({ message: "Please log in to create post." });
  } else {
    const user = await User.findById(req.body.author);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = new Post({
      title: req.body.title,
      author: user,
      content: req.body.content,
      published: req.body.published,
      date: req.body.date,
    });
    try {
      const savePost = await post.save();
      const allPosts = await Post.find();
      res.status(200).json(allPosts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

// Update post PUT method "/api/post/update/:id"
exports.put_update_post = asyncHandler(async (req, res, next) => {
  const currentUser = req.session.currentUser;
  if (typeof currentUser === "undefined" || !currentUser) {
    res.status(401).json({ message: "Please log in to update post." });
  } else {
    const { title, author, content, date, published, comments } = req.body;
    try {
      const fieldsToUpdate = {
        title: title,
        author: author,
        content: content,
        date: date,
        published: published,
        comments: comments,
      };

      // Remove fields with undefined values
      Object.keys(fieldsToUpdate).forEach(
        (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
      );

      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: fieldsToUpdate,
        },
        { new: true }
      );

      res.status(200).json({
        status: "success",
        updatedPost,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

//Delete by ID Method "/api/post/delete/:id"
exports.delete_single_post = asyncHandler(async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser;
    if (typeof currentUser === "undefined" || !currentUser) {
      res.status(401).json({ message: "Please log in to delete." });
    } else {
      const id = req.params.id;
      const post = await Post.findById(id);
      if (post) {
        if (post.comments.length > 0) {
          for (const commentId of post.comments) {
            await Comment.findByIdAndDelete(commentId);
          }
        }
        const data = await Post.findByIdAndDelete(id);
        res.send(`Post ${data.title} has been deleted..`);
      } else {
        res.status(404).json({ message: "Post not found." });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
