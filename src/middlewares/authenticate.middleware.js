const jwt = require('jsonwebtoken');
const config = require('../../config');
const { NoAutorizadoError, ProhibidoError } = require('../errors');

// Extrae el token Bearer del header Authorization y lo verifica.
// Deja los datos del usuario en req.user o corta la petición con un error.
const authenticate = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    throw new NoAutorizadoError();
  }

  const token = bearerHeader.split(' ')[1];
  if (!token) {
    throw new NoAutorizadoError('Formato de token inválido');
  }

  try {
    req.user = jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw new ProhibidoError('Token inválido o expirado');
  }

  next();
};

module.exports = authenticate;
