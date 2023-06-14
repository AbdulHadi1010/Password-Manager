import express from "express";
import { PasswordsModel } from "../models/Passwords.js";
import {encrypt, decrypt} from '../EncryptionHandler.js'
const router = express.Router();

router.post("/addPassword", async (req, res) => {
  try {
    const { password, title, id, userId } = req.body;

    const encryptedPassword = encrypt(password);

    const newPassword = await new PasswordsModel({
      id: id,
      password: encryptedPassword.password,
      title: title,
      user: userId,
      iv: encryptedPassword.iv
    });

    await newPassword.save();
    res.send("Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get('/showPasswords', async (req, res) => {
  const userId = req.query.userId
  try {
    const passwords = await PasswordsModel.find({user: userId});
    console.log(passwords)
    res.send(passwords);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.post("/decryptPassword", (req, res) => {
  console.log(req.body)
  res.send(decrypt(req.body));
});

router.delete("/deletePassword/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.query.userId;
  try {
    await PasswordsModel.findOneAndDelete({ _id: id, user: userId });
    res.send("Password deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

export default router;
