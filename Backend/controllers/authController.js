const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log("Register Request Data:", req.body);

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    res.json({ user: { id: user._id, name, email } });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("Login Request Data:", req.body);

    const user = await User.findOne({ email });
    if (!user) {
    //   console.log("❌ User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // console.log("✅ User found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    //   console.log("❌ Password does not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // console.log("✅ Password matched");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // console.log("✅ Token generated:", token);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
