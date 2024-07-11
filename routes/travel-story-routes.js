import express from "express";
import * as travelStoryController from "./../controllers/travel-stories-controller.js";
import verifyAuthToken from "../middlewares/auth-middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router
  .get("/", verifyAuthToken, travelStoryController.stories)
  .post(
    "/",
    verifyAuthToken,
    upload.single("image"),
    travelStoryController.createStory
  );

export default router;
