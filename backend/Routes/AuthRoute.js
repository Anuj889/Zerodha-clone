const router = require("express").Router();
const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

// Signup
router.post("/signup", Signup);

// Login
router.post("/login", Login);

// Verify user (for Navbar auth)
router.post("/verify", userVerification);

// Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ success: true, message: "Logged out" });
});

module.exports = router;




