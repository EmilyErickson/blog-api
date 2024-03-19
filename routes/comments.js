const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

//Post Method
router.post("/create", commentController.post_create_comment);

//Delete by ID Method
router.delete("/delete/:id", commentController.post_delete_comment);

module.exports = router;
