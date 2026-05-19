const logger = require('../utils/logger');
const { ErrorAplicacion } = require('../errors');

// Middleware central de manejo de errores. Debe registrarse al final.
// Convierte cualquier error en una respuesta JSON uniforme y nunca
// expone detalles internos (stack, SQL) al cliente.
// Express identifica este middleware por su firma de cuatro parámetros.
const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorAplicacion) {
    logger.warn(`${err.codigo}: ${err.message}`);
    return res.status(err.statusCode).json({
      error: {
        codigo: err.codigo,
        mensaje: err.message,
      },
    });
  }

  logger.error('Error no controlado', err);
  return res.status(500).json({
    error: {
      codigo: 'ERROR_INTERNO',
      mensaje: 'Ocurrió un error interno',
    },
  });
};

module.exports = errorHandler;
