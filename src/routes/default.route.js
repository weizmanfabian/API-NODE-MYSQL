const express = require('express')
const router = express.Router()

const defaultController = require('../controllers/default.controller')
const authenticate = require('../middlewares/authenticate.middleware')

router.post('/create/:tabla', authenticate, defaultController.create)

router.delete('/delete/:tabla/:name/:value', authenticate, defaultController.delete)

router.get('/findAll/:tabla', authenticate, defaultController.findAll)

router.get('/searchBy/:tabla/:name/:value', authenticate, defaultController.searchBy)

router.put('/update/:tabla/:name/:value', authenticate, defaultController.update)

module.exports = router
