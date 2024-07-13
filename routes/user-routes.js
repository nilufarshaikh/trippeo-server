import express from "express";
import * as userController from "./../controllers/users-controller.js";
import verifyAuthToken from "../middlewares/auth-middleware.js";

const router = express.Router();

router
  .post("/register", userController.register)
  .post("/login", userController.login)
  .get("/profile", verifyAuthToken, userController.profile)
  .get("/search", verifyAuthToken, userController.searchUser)
  .post("/follow", verifyAuthToken, userController.followUser)
  .post("/unfollow", verifyAuthToken, userController.unfollowUser);

export default router;
