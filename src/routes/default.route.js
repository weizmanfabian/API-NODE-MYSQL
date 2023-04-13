const express = require('express')
const router = express.Router()

const defaultController = require('../controllers/default.controller')
const { verifyToken } = require('../controllers/auth.controller')

router.post('/create/:tabla', verifyToken, defaultController.create)

router.delete('/delete/:tabla/:name/:value', verifyToken, defaultController.delete)

router.get('/findAll/:tabla', verifyToken, defaultController.findAll)

//router.get('/getData/:sql', defaultController.getData)

router.get('/searchBy/:tabla/:name/:value', verifyToken, defaultController.searchBy)

//router.get('/searchByDate/:tabla/:nameFecha/:fechaIni/:fechaFin/:adicional1/:nameAdicional1/:type1/:valueAdicional1/:adicional2/:nameAdicional2/:type2/:valueAdicional2/:adicional3/:nameAdicional3/:type3/:valueAdicional3/:adicional4/:nameAdicional4/:type4/:valueAdicional4', defaultController.searchByDate)

router.put('/update/:tabla/:name/:value', verifyToken, defaultController.update)

module.exports = router