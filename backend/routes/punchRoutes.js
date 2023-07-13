const express = require("express")
const router = express.Router()
const { qrToken } = require("../controllers/punchLogController")
const validateToken = require("../middleware/validateTokenHandler")

router.post("/punchIn",validateToken, qrToken)

module.exports = router