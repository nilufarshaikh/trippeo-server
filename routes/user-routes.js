import express from "express";
import * as userController from "./../controllers/users-controller.js";
import verifyAuthToken from "../middlewares/auth-middleware.js";

const router = express.Router();

router
  .get("/search", verifyAuthToken, userController.searchUser)
  .post("/:followeeId/follow", verifyAuthToken, userController.followUser)
  .post("/:followeeId/unfollow", verifyAuthToken, userController.unfollowUser);

export default router;
