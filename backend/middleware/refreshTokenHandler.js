const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const refreshAccessToken = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401);
        throw new Error('Invalid access token');
    }
    const accessToken = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const { id } = decoded.user;
        const user = await User.findById(id);
        if (user) {
            const refreshToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );

            // Update the access token in the cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
            });

            res.status(200).json({ refreshToken });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(401);
        throw new Error("Invalid access token");
    }
});

module.exports = refreshAccessToken