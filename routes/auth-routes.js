import express from "express";
import * as authController from "./../controllers/auth-controller.js";
import verifyAuthToken from "../middlewares/auth-middleware.js";

const router = express.Router();

router
  .post("/register", authController.register)
  .post("/login", authController.login)
  .get("/profile", verifyAuthToken, authController.profile);

export default router;
