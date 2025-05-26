const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  updateProfile,
  changePassword,
} = require("../../controllers/auth/auth-controller");
const { forgotPassword, resetPassword } = require("../../controllers/auth/password-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protect this route with authMiddleware
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

// Additional routes
router.put("/update-profile", authMiddleware, updateProfile);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
