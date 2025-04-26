import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import type { StringValue } from "ms";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const secretKey = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES as StringValue;

    if (!secretKey || typeof secretKey !== 'string') {
      console.error("JWT_SECRET is not defined or invalid");
      return res.status(500).json({ message: "Server configuration error" });
    }

    if (!expiresIn || typeof expiresIn !== 'string') {
      console.error("JWT_EXPIRES is not defined or invalid");
      return res.status(500).json({ message: "Server configuration error" });
    }

    console.log('expiresIn:', expiresIn)
    
    // ✅ Use the async version of jwt.sign in v9+
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      secretKey,
      { expiresIn: expiresIn }
    );

    return res.json({ message: "Login Successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const router = Router();
router.post('/login', login);
export default router;
