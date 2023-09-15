const express = require('express')
const router = express.Router()
const { createNotification, getAllNotifications } = require("../controllers/NotificationController")
const validateToken = require("../middleware/validateTokenHandler")

router.post('/create',validateToken, createNotification)
router.get('/getall',validateToken, getAllNotifications)

module.exports = router
