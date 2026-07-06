const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // 1. Check the headers for an Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Missing or invalid token format" });
    }

    // Extract the token part from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    try {
        // 2. Verify that the token is valid
        // jwt.verify will throw an error if the token is expired or tampered with
        const decoded = jwt.verify(token, JWT_SECRET);

        // 3. Put the userId in the request object
        // We assume that when you created the token, you payloaded it with { userId: ... }
        req.userId = decoded.userId;

        // Pass control to the next middleware or the actual route handler
        next();
        
    } catch (err) {
        // 4. If token fails verification, return a 403 status
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = {
    authMiddleware
};