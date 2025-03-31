import { Router } from 'express';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    // how jwt works - chatgpt
    // search if user exists in the database using req.body {username, password}
    // if user exits - return jwt token
    // if users doesnt exits you retrun 401 
    // import jwt from 'jsonwebtoken'; - how to generate jwt token
    // on frontend - if user exits - rediredct to right page
    // if user not exits - show error
    // in your api on routes that return sensitive information - apply jwt check / valid
    // up: protect routes with jwt!
    return res.json(req.body);
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
