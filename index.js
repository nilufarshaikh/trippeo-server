import express from "express";
import dotenv from "dotenv/config";
import dbConnect from "./config/db.js";

const app = express();
await dbConnect();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
