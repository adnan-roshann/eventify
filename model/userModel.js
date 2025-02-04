import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"]},
  googleid: { type: String, unique: true },
  isVerified: { type: Boolean, default: false },
  avatar: { type: String },
  otp: String,              // For OTP verification
  otpExpiresAt: Date

})

const user = mongoose.model('user',userSchema);
export default user