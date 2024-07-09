import express from "express";
import "dotenv/config";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/user-routes.js";
import travelStoryRoutes from "./routes/travel-story-routes.js";

const app = express();
app.use(express.json());

await dbConnect();

app.get("/", (req, res) => {
  res.send("Welcome!");
});

// Routes
app.use("/auth", userRoutes);
app.use("/stories", travelStoryRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
