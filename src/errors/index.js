// Jerarquía de errores de dominio de la aplicación.
// Cada error transporta el código HTTP y un código legible para que
// el middleware central construya una respuesta uniforme.

class ErrorAplicacion extends Error {
  constructor(message, statusCode, codigo) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.codigo = codigo;
    this.esOperacional = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class SolicitudInvalidaError extends ErrorAplicacion {
  constructor(message) {
    super(message, 400, 'SOLICITUD_INVALIDA');
  }
}

class NoAutorizadoError extends ErrorAplicacion {
  constructor(message = 'Token de autenticación ausente') {
    super(message, 401, 'NO_AUTORIZADO');
  }
}

class ProhibidoError extends ErrorAplicacion {
  constructor(message = 'No tiene permisos para realizar esta acción') {
    super(message, 403, 'PROHIBIDO');
  }
}

class RecursoNoEncontradoError extends ErrorAplicacion {
  constructor(message) {
    super(message, 404, 'RECURSO_NO_ENCONTRADO');
  }
}

class ErrorBaseDatos extends ErrorAplicacion {
  constructor(message = 'Error al acceder a la base de datos') {
    super(message, 500, 'ERROR_BASE_DATOS');
  }
}

module.exports = {
  ErrorAplicacion,
  SolicitudInvalidaError,
  NoAutorizadoError,
  ProhibidoError,
  RecursoNoEncontradoError,
  ErrorBaseDatos,
};
