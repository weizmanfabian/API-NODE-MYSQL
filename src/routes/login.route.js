const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

// https://www.youtube.com/watch?v=cL3bXzUBFUA

const defaultController = require('../controllers/default.controller');
const loginController = require('../controllers/login.controller');


// Get the index page
router.get('/', verifyToken, (req, res, next) => {

})

function verifyToken(req, res, next) {

}

router.get('/login', loginController.getLogin)
router.post('/login/:user/:pass', loginController.postLogin)
router.get('/permisos/:idUser', loginController.getPermisos)
router.get('/citys/:idRol', loginController.getCitys)

module.exports = router;