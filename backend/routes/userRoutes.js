const express = require("express")
const router = express.Router()
const { registerUser, loginUser, currentUser } = require("../controllers/userController")
const validateToken = require("../middleware/validateTokenHandler")
const {generateQr} = require('../controllers/qrController')

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/current", validateToken, currentUser)
// router.post("/qr", generateQr);     // maybe remove this in future

module.exports = router