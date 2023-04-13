const express = require('express')
const { login } = require('../controllers/auth.controller')
const router = express.Router()

router.post('/login', login)
//router.post('/create/:tabla', defaultController.create)

module.exports = router