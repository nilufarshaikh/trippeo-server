import express from "express";

const router = express.Router();

router.post("/register", postRegister);

export default router;
