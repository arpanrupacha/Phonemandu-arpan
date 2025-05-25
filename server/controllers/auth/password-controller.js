const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rupacharpan@gmail.com", 
    pass: "tglg bniz jtcw fuiz",       
  },
});

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ success: false, message: "No user with that email." });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetUrl = `http://localhost:5173/auth/reset-password/${token}`;
  const logoUrl = "http://localhost:5173/phonemandu-big.png";

  await transporter.sendMail({
    to: user.email,
    subject: "Phonemandu Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border:1px solid #eee; border-radius:8px; padding:24px; background:#fafafa;">
        <div style="text-align:center;">
          <img src="${logoUrl}" alt="Phonemandu Logo" style="width:120px; margin-bottom:16px;" />
        </div>
        <h2 style="color:#B22222; text-align:center;">Reset Your Password</h2>
        <p>Hello ${user.userName || "Phonemandu User"},</p>
        <p>We received a request to reset your password for your Phonemandu account. If you did not make this request, you can safely ignore this email.</p>
        <p style="text-align:center; margin:32px 0;">
          <a href="${resetUrl}" style="background:#B22222; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold;">Reset Password</a>
        </p>
        <p>If the button above does not work, copy and paste this link into your browser:</p>
        <p style="word-break:break-all;"><a href="${resetUrl}">${resetUrl}</a></p>
        <hr style="margin:32px 0;">
        <p style="font-size:13px; color:#888; text-align:center;">Thank you for trusting Phonemandu.<br/>Where technology meets trust.</p>
      </div>
    `,
  });

  res.json({ success: true, message: "Password reset email sent." });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({ success: false, message: "Invalid or expired token." });

  user.password = await bcrypt.hash(password, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ success: true, message: "Password reset successful." });
};