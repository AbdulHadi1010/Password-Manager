import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/User.js";
import passwordsRouter from "./routes/Passwords.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/", async (req, res) => {
  res.json({ message: "Hello world" });
});
app.use("/User", userRouter);
app.use("/Passwords", passwordsRouter);

// Connect to MongoDB
mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Check if the connection was successful
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("server is running");
});
