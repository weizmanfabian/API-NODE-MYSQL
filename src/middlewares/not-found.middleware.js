const { RecursoNoEncontradoError } = require('../errors');

// Middleware para rutas no registradas. Se ubica justo antes del
// manejador de errores y delega en él la respuesta.
const notFound = (req, res, next) => {
  next(new RecursoNoEncontradoError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
};

module.exports = notFound;
