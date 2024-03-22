const bcrypt = require("bcryptjs");

const User = require("../models/users");
const Post = require("../models/posts");

const asyncHandler = require("express-async-handler");

//Post Method "/api/user/create"
exports.post_create_user = asyncHandler(async (req, res, next) => {
  const password = req.body.password;
  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
  });
  try {
    const userToSave = await user.save();
    res.status(200).json(userToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//User login post method "/api/user/login"
exports.post_user_login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });

    // If user not found
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);

    // If password is invalid
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Set currentUser in session
    req.session.currentUser = user;
    console.log(req.session.currentUser);

    // Respond with success
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all Method "/api/user/all"
exports.get_all_users = asyncHandler(async (req, res, next) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method  "/api/user/:id"
exports.get_single_user = asyncHandler(async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method  "/api/user/update/:id"
exports.put_update_user = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await User.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method  "/api/user/delete/:id"
exports.delete_single_user = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndDelete(id);
    res.send(`User ${data.username} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all post by user "api/user/:id/all-posts"
exports.get_posts_by_user = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.id;
    const posts = await Post.find({ author: userId });

    res.status(200).json({ posts: posts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
