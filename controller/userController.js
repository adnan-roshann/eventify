import user from "../model/userModel.js";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';



// export const signup = async (req, res) => {
//     try {
//     const { name, email, password,gender} = req.body;
//    console.log(req.body);
   

   


// const existingUser = await user.findOne({email });
// if (existingUser) {
//     return res.status(400).json({ message: 'email already in use' });
// }
// console.log(existingUser, 'existing user');
// const hashedPassword = await bcrypt.hash(password, 10);
// console.log(hashedPassword);
// const boyProfilePic =`https://avatar.iran.liara.run/public/boy?username=${name}`;
// const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${name}`;

// const newUser = new user({
//     name,
//     email,
//     password: hashedPassword,
//     gender,
//     profilePic:gender === "male" ? boyProfilePic : girlProfilePic,
// });
// console.log(newUser,);
// await newUser.save();
// // res.status(201).json({ message: 'User registered successfully!' });
// res.redirect('/user/home');

// }catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
// }
// }

// export const RenderHome = async (req,res) =>{
//     res.render('home')

// }


// ------------------------------------------------------------------------------

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  // Use an App Password (not your actual password)
  }
});


// Function to Generate 6-Digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();





export const signup = async (req, res) => {
  const { name, email, password, gender, googleid } = req.body;

  if (!name || !email || !password || !gender) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const otp = generateOTP();


    //  Avatar selection based on gender
    let avatarURL;
    if (gender === "male") {
      avatarURL = "https://avatar.iran.liara.run/public/41";
    } else if (gender === "female") {
      avatarURL = "https://avatar.iran.liara.run/public/55";
    } else {
      avatarURL = "https://avatar-placeholder.iran.liara.run/avatars/other";
    }

    // ✅ Save user with avatarURL
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
      gender,
      avatar: avatarURL,
      otp,
      isVerified: false,
      googleid: googleid || undefined
    });

    await newUser.save();

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Verify Your Email - OTP Code',
      text: `Your OTP for verification is: ${otp}`
  };

  await transporter.sendMail(mailOptions);


    return res.redirect('/user/landing');

  } catch (err) {
    console.error('Signup error:', err);
    return res.status(400).json({ error: 'Error registering user' });
  }
};


  export const RenderHome = async (req,res) =>{
    res.render('home')
  }


 
  export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found.' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP.' });
        }

        user.isVerified = true;
        user.otp = null; // Clear OTP after successful verification
        await user.save();

        return res.status(200).json({ message: 'Email verified successfully.' });

    } catch (err) {
        console.error('OTP verification error:', err);
        return res.status(500).json({ error: 'Error verifying OTP' });
    }
};

