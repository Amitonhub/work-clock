const express = require("express")
const router = express.Router()
const { registerUser, loginUser, currentUser } = require("../controllers/userController")
const validateToken = require("../middleware/validateTokenHandler")
const refreshAccessToken = require("../middleware/refreshTokenHandler")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/current", validateToken, currentUser)
// router.post("/refresh-token", refreshAccessToken);

module.exports = router