const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

//Post Method
router.get("/", (req, res) => {
  res.render("view/index", { title: "Blog" });
});
module.exports = router;
