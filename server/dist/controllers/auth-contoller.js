"use strict";
// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import { User } from '../models/user.js';
// export const loginUser = async (req: Request, res: Response) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ where: { username } });
//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign(
//       { username: user.username, id: user.id },
//       process.env.JWT_SECRET as string, // ✅ Make sure .env matches
//       { expiresIn: process.env.JWT_EXPIRES || '1h' }
//     );
//     res.json({ token });
//   } catch (err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };
