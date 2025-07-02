import Info from "../models/UserInfo.model.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Info.findOne({ email: email, password: password });
    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
 