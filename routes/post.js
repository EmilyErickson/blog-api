const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

//Post Method "/api/post/create"
router.post("/create", postController.post_create_post);

//Get all Method "/api/post/all"
router.get("/all", postController.get_all_posts);

//Get by ID Method "/api/post/:id"
router.get("/:id", postController.get_single_post);

//Get by comments for post by ID Method "/api/post/:id/comments"
router.get("/:id/comments", postController.get_post_comments);

//Update by ID Method "/api/post/update/:id"
router.put("/update/:id", postController.put_update_post);

//Delete by ID Method "/api/post/delete/:id"
router.delete("/delete/:id", postController.delete_single_post);

module.exports = router;
