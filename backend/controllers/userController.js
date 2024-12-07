import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import tempUserModel from "../models/tempUserModel.js";


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SERVER_EMAIL_USER,
      pass: process.env.SERVER_EMAIL_PASS,
    }
  });
  
  // Function to send the email
  const sendVerificationEmail = async (userEmail, token) => {
    try {
      const mailOptions = {
        from: process.env.SERVER_EMAIL_USER, // Server email as sender
        replyTo: userEmail, // User's email as reply-to address
        to: userEmail,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${token}`,
        html: `<p>Your verification code is: <b>${token}</b></p>`
      };
  
      await transporter.sendMail(mailOptions);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };
  

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET); // Corrected this line
};

// route for user Login
const loginUser = async (req, res) => {
    // Implement login functionality here
    try {
         const {email, password} = req.body

         const user =await userModel.findOne({email})
         if (!user) {
            return res.json({success: false, message: "User doesn't exists"})
         }
         const isMatch = await bcrypt.compare(password, user.password)

         if (isMatch){
            const token = createToken(user._id)
            res.json({success:true, token})
         }
         else{
                res.json({success: false, message:"Invalid credentials"})
         }
    } catch (error) {
          console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// route for user registration
// const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Checking if user already exists
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, message: "User already exists" });
//         }

//         // Validate email and password strength
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter a valid email" });
//         }
//         if (password.length < 8) {
//             return res.json({ success: false, message: "Please enter a strong password" });
//         }

//         // Hashing user password
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt);

//         // Register new user
//         const newUser = new userModel({
//             name,
//             email,
//             password: hashPassword
//         });
//         const user = await newUser.save();

//         // Generate token
//         const token = createToken(user._id);

//         res.json({ success: true, token });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };





// Registration endpoint
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const exists = await userModel.findOne({ email });
  if (exists) {
    return res.json({ success: false, message: "User already exists" });
  }

  // Validate email and password
  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Please enter a valid email" });
  }
  if (password.length < 8) {
    return res.json({ success: false, message: "Please enter a strong password" });
  }

  // Generate 6-digit verification token
  const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Temporarily store user details and token
  const tempUser = new tempUserModel({
    name,
    email,
    password: hashPassword,
    verificationToken,
    createdAt: Date.now() // For token expiry if needed
  });
  await tempUser.save();

  // Send verification email
  await sendVerificationEmail(email, verificationToken);

  // Return response
  res.json({ success: true, message: "Verification email sent. Please check your email.", verify: true });
};

// Verification for the user upon successfully signup
const verifyUser = async (req, res) => { 
    const { token } = req.body;
  
    // Find the temporary user by token
    const userTempData = await tempUserModel.findOne({ verificationToken: token });
  
    // Check if the user exists and the token matches
    if (!userTempData) {
      return res.json({ success: false, message: "Invalid or expired token" });
    }
  
    // Save the verified user to the main user collection
    const newUser = new userModel({
      name: userTempData.name,
      email: userTempData.email,
      password: userTempData.password,
    });
    await newUser.save();
  
    // Delete the temporary user data
    await tempUserModel.deleteOne({ verificationToken: token });
  
    res.json({ success: true, message: "Account verified and created successfully." });
  };
  




// route for admin login
const adminLogin = async (req, res) => {
    // Implement admin login functionality here
    try {
        const {email, password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){ 
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({success:true, token})
    }  else{
        res.json({success:false, message:"Invalid credentials"})
    }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// FORGOT PASSWORD
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Save token and expiry
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    const resetLink = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
    const mailOptions = {
      from: process.env.SERVER_EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Password reset link sent to your email." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ENDPOINT TO RESET PASSWORD

const resetPassword = async (req, res) => {
  const { token } = req.params; 
  const { newPassword } = req.body;

  console.log("Token:", token); // Check if the token is being received
  console.log("New Password:", newPassword);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid or expired token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashPassword;
    user.resetPasswordToken = undefined; // THIS IS TO  Clear token
    user.resetPasswordExpires = undefined; // THIS IS TO Clear expiry
    await user.save();

    res.json({ success: true, message: "Password has been reset successfully." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};



export { loginUser, registerUser, verifyUser, adminLogin,requestPasswordReset,resetPassword };
