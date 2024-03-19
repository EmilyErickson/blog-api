const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

//Post Method
router.get("/", postController.get_all_posts);

module.exports = router;
