const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

//Post Method "/api/user/create"
router.post("/create", userController.post_create_user);

//Get all Method "/api/user/all"
router.get("/all", userController.get_all_users);

//Get by ID Method  "/api/user/:id"
router.get("/:id", userController.get_single_user);

//Update by ID Method  "/api/user/update/:id"
router.put("/update/:id", userController.put_update_user);

//Delete by ID Method  "/api/user/delete/:id"
router.delete("/delete/:id", userController.delete_single_user);

//Get all post by user "api/user/:id/posts"
router.get("/:id/posts", userController.get_posts_by_user);

module.exports = router;
