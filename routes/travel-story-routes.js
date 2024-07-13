import express from "express";
import * as travelStoryController from "./../controllers/travel-stories-controller.js";
import verifyAuthToken from "../middlewares/auth-middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router
  .get("/stories", verifyAuthToken, travelStoryController.stories)
  .post(
    "/stories",
    verifyAuthToken,
    upload.array("photos", 5),
    travelStoryController.createStory
  )
  .get("/stories/:storyId", verifyAuthToken, travelStoryController.singleStory)
  .post(
    "/stories/:storyId/comments",
    verifyAuthToken,
    travelStoryController.addComment
  )
  .delete(
    "/stories/:storyId/comments/:commentId",
    verifyAuthToken,
    travelStoryController.deleteComment
  );

export default router;
