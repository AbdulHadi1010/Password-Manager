import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();
import { UserModel } from "../models/User.js";

router.post("/signup", async (req, res) => {
    const { name, id, password } = req.body;
    const user = await UserModel.findOne({ id });
    if (user) {
      return res.status(400).json({ message: "id already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, id, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  });

router.post("/signin", async (req, res) => {
  const { id, password } = req.body;

  const user = await UserModel.findOne({ id: id });

  if (!user) {
    return res
      .status(400)
      .json({ message: "email/username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "email/username or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { router as userRouter, verifyToken };