const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

//desc punch of user
//route POST punch
//access public

const qrToken = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401);
        throw new Error('Invalid access token');
    }
    const accessToken = authHeader.split(' ')[1];
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const { id } = decoded.user;
    const user = await User.findById(id);

    if (!user) {
        res.status(401);
        throw new Error("Email or password is not valid");
    }

    // Verify IP address
    const clientIp = req.ip; 
    if (user.ipAddress !== clientIp) {
        res.status(401);
        throw new Error("IP address does not match");
    }

    const currentTime = new Date();
    const startOfValidity = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 9, 0, 0);
    const endOfValidity = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 11, 0, 0);

    if (currentTime < startOfValidity || currentTime > endOfValidity) {
        res.status(423);
        throw new Error("Access token is not valid at the current time.");
    }

    const qrToken = jwt.sign(
        {
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
                ip: user.ipAddress
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1s" }
    );

    res.cookie("qrToken", qrToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000
    });
    
    res.status(200).json("QR token has been generated successfully.");
});

module.exports = { qrToken };

