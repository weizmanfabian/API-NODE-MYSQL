const express = require('express')
const { login, resetPassword } = require('../controllers/auth.controller')
const authenticate = require('../middlewares/authenticate.middleware')
const router = express.Router()

router.post('/login', login)

router.put('/reset-password', authenticate, resetPassword)

module.exports = router
