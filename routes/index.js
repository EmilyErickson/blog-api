const express = require("express");
const router = express.Router();
const path = require("path"); // Import the path module
const index = path.join(__dirname, "../views/index.ejs"); // Correct path to index.ejs

const postController = require("../controllers/postController");

//Post Method
router.get("/", (req, res) => {
  res.render(index, { title: "Blog" });
});
module.exports = router;
