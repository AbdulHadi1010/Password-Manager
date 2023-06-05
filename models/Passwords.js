import mongoose, {Schema} from "mongoose";
const PasswordsSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    id: { type: String, required: true },
    password: { type: String, required: true },
    title: { type: String, required: true },
    iv: { type: String, required: true },
});

export const PasswordsModel = mongoose.model("Passwords", PasswordsSchema);
