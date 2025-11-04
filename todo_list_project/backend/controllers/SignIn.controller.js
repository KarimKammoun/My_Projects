import Info from "../models/UserInfo.model.js";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await Info.find({ email: email});
    console.log("User found:", users);

    if (!users) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    
    for (const user of users) {
      
      if (await bcrypt.compare(password, user.password)) {
        console.log(`user ${user._id} -> password match?`, true);
        return res.status(200).json({ success: true, user });
      }
    }
    return res.status(401).json({ success: false, message: "Invalid password" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
 