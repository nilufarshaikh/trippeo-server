import express from "express";
import * as userController from "./../controllers/users-controller.js";

const router = express.Router();

router.post("/register", userController.register);

export default router;
