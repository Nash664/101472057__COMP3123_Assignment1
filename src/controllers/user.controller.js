import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists =
      (await User.findOne({ username })) || (await User.findOne({ email }));
    if (exists) {
      return res
        .status(409)
        .json({ status: false, message: "Username or email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash });

    return res.status(201).json({
      message: "User created successfully.",
      user_id: String(user._id)
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const query = email ? { email } : { username };
    const user = await User.findOne(query);
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Username and password" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Username and password" });
    }

    
    return res.status(200).json({
      message: "Login successful."
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};
