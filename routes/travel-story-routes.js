import express from "express";
import * as travelStoryController from "./../controllers/travel-stories-controller.js";
import verifyAuthToken from "../middlewares/auth-middleware.js";

const router = express.Router();

router
  .get("/", verifyAuthToken, travelStoryController.stories)
  .post("/", verifyAuthToken, travelStoryController.createStory);

export default router;
