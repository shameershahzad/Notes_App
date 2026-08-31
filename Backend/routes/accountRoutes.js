const express = require("express")
const accountModel = require("../Model/accountModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = express.Router()


router.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const checkEmail = await accountModel.findOne({ email })

    if (checkEmail) {
      return res.status(404).json({ message: "Email already exist" })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const user = await accountModel.create({ name: req.body.name, email: req.body.email, password: hashPassword })

    return res.status(200).json({ result: user, message: "SignUp successfully!" })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }

})

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await accountModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "Your Secret Key", { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user._id, type: "refresh" }, process.env.JWT_SECRET || "Your Secret Key", { expiresIn: "7d" });

    res.status(200).json({ message: "Success", token, refreshToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/refreshToken", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || "Your Secret Key");
    if (decoded.type !== "refresh") {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const token = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET || "Your Secret Key", { expiresIn: "1h" });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(401).json({ message: "Refresh token expired or invalid" });
  }
});

router.post("/verifyEmail", async (req, res) => {
  const { email } = req.body;
  try {
    const foundEmail = await accountModel.findOne({ email })
    if (!foundEmail) {
      return res.status(400).json({ message: "Email doesn't exist" })
    }
    const resetToken = jwt.sign({ email, purpose: "reset" }, process.env.JWT_SECRET || "Your Secret Key", { expiresIn: "15m" });
    return res.status(200).json({ message: "Email found", resetToken })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

router.put("/updatePassword/:email", async (req, res) => {
  const { newPassword, resetToken } = req.body;

  if (!resetToken) {
    return res.status(403).json({ message: "Missing reset token" })
  }

  if (!newPassword || !newPassword.trim()) {
    return res.status(400).json({ message: "Please enter a new password" })
  }

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET || "Your Secret Key");
    if (decoded.purpose !== "reset" || decoded.email !== req.params.email) {
      return res.status(403).json({ message: "Invalid reset token" })
    }
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired reset token" })
  }

  try {
    const hashPassword = await bcrypt.hash(newPassword, 10)

    const updatePass = await accountModel.updateOne({ email: req.params.email }, { $set: { password: hashPassword } });
    if (updatePass) {
      return res.status(200).json({ message: "Password updated" })
    }
  } catch (err) {
    return res.status(500).json({ error: err })
  }
})


module.exports = router