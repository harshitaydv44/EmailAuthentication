import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not Authorized, login again'
        });
    }

    try {
        // Verify and decode the JWT
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token contains the required 'id'
        if (tokenDecode.id) {
            req.user = { id: tokenDecode.id };  // Set the decoded id to req.user
            console.log('Authenticated user ID:', tokenDecode.id);  // Log for debugging
        } else {
            return res.status(401).json({
                success: false,
                message: 'Not Authorized, login again'
            });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);  // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: 'Token verification failed, please try again later'
        });
    }
};

export default userAuth;
