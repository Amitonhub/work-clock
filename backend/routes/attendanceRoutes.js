const express = require("express")
const router = express.Router()
const { attendance, getAttendanceByDate, getAllAttendanceById } = require("../controllers/attendanceController")
const validateToken = require("../middleware/validateTokenHandler")

router.post("/",validateToken, attendance)
router.get("/:user_id/:date", validateToken, getAttendanceByDate)
router.get("/:user_id", validateToken, getAllAttendanceById)

module.exports = router