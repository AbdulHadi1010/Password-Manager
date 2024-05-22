import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/User.js";
import passwordsRouter from "./routes/Passwords.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const DATABASE = process.env.DATABASE;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Handle POST request for the root path
app.get("/", async (req, res) => {
  res.json({ message: `Hello world from first backend from ${PORT}` });
});

app.use("/User", userRouter);
app.use("/Passwords", passwordsRouter);

// Connect to MongoDB
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection was successful
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
