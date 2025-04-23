import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret); // UTC
        req.user = decoded; // Attach user info to request
        next(); // Proceed to next middleware or route
        return; // ✅ avoid "not all code paths return" error
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};
