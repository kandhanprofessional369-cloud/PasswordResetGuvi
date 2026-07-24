const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS ? "SMTP key exists" : "SMTP key missing");
// =====================
// Register User
// =====================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user
    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// Login User
// =====================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// Forgot Password
// =====================
const forgotPassword = async (req, res) => {
  try {
    console.log("Forgot Password API called");

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({
        message: "User not found",
      });
    }

    console.log("User found:", user.email);

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    console.log("Before sendMail");
console.log("SMTP User:", process.env.EMAIL_USER);

    await transporter.sendMail({
  from: '"Password Reset" <banuvenkateshshanthi@gmail.com>',
  to: user.email,
  subject: "Password Reset Request",
  html: `
    <h2>Password Reset</h2>
    <a href="${resetLink}">Reset Password</a>
  `,
});

    console.log("After sendMail");

    res.status(200).json({
      message: "Password reset link has been sent to your email.",
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// Reset Password
// =====================
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find User
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Hash New Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update Password
    user.password = hashedPassword;

    // Save User
    await user.save();

    res.status(200).json({
      message: "Password Reset Successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Invalid or Expired Token",
    });
  }
};

// =====================
// Export Controllers
// =====================
module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
