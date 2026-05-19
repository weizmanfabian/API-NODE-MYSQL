// Envuelve un controlador asíncrono para que cualquier rechazo de promesa
// se propague al middleware de manejo de errores mediante next(error).
// Evita repetir bloques try/catch en cada controlador.

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
