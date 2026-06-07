import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
 import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

// Database connection
 connectDB()

app.use(cors());

// Middlewares
app.use(express.json());

// Route
app.get("/", (req, res) => res.send("server is live..."));
app.use('/api/users', userRouter)
app.use('/api/resume',resumeRouter)
app.use('/api/ai', aiRouter)

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});