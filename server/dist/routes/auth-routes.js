import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "invalid username or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        const expiresIn = process.env.JWT_EXPIRES;
        if (!secretKey) {
            console.error("JWT_SECRET_KEY not defined in env file");
            return res.status(500).json({ message: "Server configuration error" });
        }
        if (!expiresIn) {
            console.error("JWT_EXPIRES is not defined");
            return res.status(500).json({ message: "Server configuration error" });
        }
        const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: parseInt(expiresIn) } // Converts to a number
        );
        return res.json({ message: "Login Successful", token });
    }
    catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
// how jwt works - chatgpt:completed
// search if user exists in the database using req.body {username, password}:completed
// if user exists - return jwt token:completed
// if users doesnt exits you retrun 401 
// import jwt from 'jsonwebtoken'; - how to generate jwt token
// on frontend - if user exists - rediredct to right page
// if user not exists - show error
// in your api on routes that return sensitive information - apply jwt check / valid
// up: protect routes with jwt!
