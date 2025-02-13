import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  gender: { type: String, enum: ["male", "female"]},
  googleid: { type: String, unique: true, sparse: true },
  isVerified: { type: Boolean, default: false },
  avatar: { type: String },
  otp: { type: String},
  otpExpires: Date,


})

const user = mongoose.model('user',userSchema);
export default user