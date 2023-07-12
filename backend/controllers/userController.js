const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

//desc Register a user
//route POST users/register
//access public

const registerUser = asyncHandler(async (req, res) => {
    console.log("The Request body is:", req.body)
    const { username, firstname, lastname, physicaladdress, city, state, zip, roleId, mobilenumber, email, password } = req.body
    if (!username || !email || !password || !firstname || !lastname || !physicaladdress || !city || !state || !zip || !mobilenumber || !roleId) {
        res.status(400)
        throw new Error("All Fields are mandatory")
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User Already Registered.")
    }
    // hash password
    const hashedPassword = await bcypt.hash(password, 10)
    console.log(hashedPassword)

    const user = await User.create({
        username,
        firstname,
        lastname,
        physicaladdress,
        city,
        state,
        zip,
        roleId,
        mobilenumber,
        email,
        password: hashedPassword
    })
    console.log("User Created Successfully", user)
    if (user) {
        res.status(200).json({ _id: user.id, email: user.email })
    } else {
        res.status(400)
        throw new Error("User Data is not valid")
    }
    res.json(user)
})

//desc Login user
//route POST users/login
//access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory!");
    }
    const user = await User.findOne({ email });
    // compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        );
        res.cookie("accessToken", accessToken, {
            httpOnly: true
        });
        // to add 1d expiry => expires: new Date(Date.now() + 24 * 60 * 60 * 1000
        // refresh token starts
        // const refreshToken = jwt.sign({
        //     user: {
        //         username: user.username,
        //         email: user.email,
        //         id: user.id
        //     }
        // }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        // res.cookie("refreshToken", refreshToken, {
        //     httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        // });
        // refresh token ends
        res.status(200).json(accessToken);
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});


//desc Current User Info
//route GET users/current
//access private

const currentUser = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401);
        throw new Error('Invalid access token');
    }
    const accessToken = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const { username, email, id } = decoded.user;
        const user = await User.findById(id);
        if (user) {
            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                physicaladdress: user.physicaladdress,
                state: user.state,
                city: user.city,
                zip: user.zip,
                RoleId: user.roleId,
                mobilenumber: user.mobilenumber,
                accessToken: req.cookies.accessToken
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(401);
        throw new Error("Invalid access token");
    }
});

module.exports = { registerUser, loginUser, currentUser }